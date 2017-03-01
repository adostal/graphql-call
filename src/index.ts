/**
 * GraphQL Request type
 * Use for set URL and headers
 */
export interface GraphQLCallRequest {
    url: string;
    headers?: { [key: string]: any };
}

/**
 * GraphQL Query type
 * Use for set GraphQL query
 */
export interface GraphQLCallQuery {
    [key: string]: {
        type?: 'query' | 'mutation'
        variables?: { [key: string]: any },
        result: string;
        alias?: string;
        debug?: boolean;
    }
}

/**
 * GraphQL Call type
 * Main type
 */
export interface GraphQLCall {
    query: (query: GraphQLCallQuery) => Promise<any>;
    mutation: (query: GraphQLCallQuery) => Promise<any>;
}

const getQuery = (request: GraphQLCallRequest, query: GraphQLCallQuery, type: 'query' | 'mutation'): Promise<any> => {
    let headers = new Headers(request.headers);
    if (!request.headers || !request.headers['Content-Type']) {
        headers.append('Content-Type', 'application/json');
    }
    let req = new Request(request.url, {
        method: 'POST',
        body: JSON.stringify({
            query: getQueryString(query, type),
        }),
        headers: headers,
    });
    return fetch(req).then(res => {
        // FIXME handle errors
        return res.json();
    });
};

const getQueryString = (query: GraphQLCallQuery, type: 'query' | 'mutation'): string => {
    let result:string[] = [`${type} {`];
    Object.keys(query).forEach(name => {
        let q = query[name];
        result.push(q.alias ? `${q.alias}:${name}` : name);
        if (q.variables) {
            let queryString = Object.keys(q.variables).map(v => `${v}:${getValue(q.variables[v])}`).join(', ');
            result.push(`(${type === 'mutation' ? 'input: \{' + queryString + '}' : queryString})`);
        }
        result.push(`\{ ${q.result} }`);
        if (q.debug) {
            console.debug('query:', result.join(' '));
        }
    });
    result.push('}');
    return result.join(' ');
};

/**
 * Check GraphQL value and format for query
 */
const getValue = (value: any): any => {
    if (typeof value === 'string') {
        return `"${value}"`;
    }
    if (Array.isArray(value)) {
        return `[${value.map(v => getValue(v)).join(', ')}]`;
    }
    return value;
};

export default (request: GraphQLCallRequest): GraphQLCall => {
    return {
        query: (query: GraphQLCallQuery): Promise<any> => {
            return getQuery(request, query, 'query');
        },
        mutation: (mutation: GraphQLCallQuery): Promise<any> => {
            return getQuery(request, mutation, 'mutation');
        }
    };
};
