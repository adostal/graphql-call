# GraphQL Call

> Library for call GraphQL API.

## Install

`npm i graphql-call isomorphic-fetch --save`

## Queries

### Simple query
```
query {
    users {
        id
    }
}
```
```typescript
import 'isomorphic-fetch';
import api, {GraphQLCall} from "graphql-call";

let client = api({url: 'http://localhost:4000/graphql'});

client.query({
    users: {
        result: 'id'
    }
}).then(result => {
    console.log('result: ', result);
}).catch(error => {
    console.error('error: ', error);
});
```

### Query with params
```
query {
    users(search: "Test") {
        id
    }
}
```
```typescript
client.query({
    users: {
        variables: {search: "Test"},
        result: 'id'
    }
});
```

### Complex query
```
query {
    list: items (search: "Test", limit: 10, inTrash: true, labels: [1,2,4]) {
        countAll
        data {
            id
            firstName
        }
    }
}
```
```typescript
let filter = {
    search: "Test",
    limit: 10,
    inTrash: true,
    labels: [1, 2, 4]
};
client.query({
    items: {
        variables: filter,
        result: `
        countAll
        data {
            id
            firstName
        }`,
        alias: 'list'
    }
});
```

### Multiple queries
```
query {
    users {
        id
    }
    items {
        id
        name
    }
}
```
```typescript
client.query({
    users: {
        result: 'id'
    },
    items: {
        result: `
        id
        name`
    }
});
```

## Mutations

> Mutations using pattern: nameMutation(input: {}) ...

## Simple mutation
```
mutation {
    addUser (input: {firstName: "Ales", lastName: "Dostal"}) {
        id
    }
}
```
```typescript
client.mutation({
    addUser: {
        variables: {firstName: "Ales", lastName: "Dostal"},
        result: 'id'
    }
});
```

### Complex mutation
> As complex query. Difference between query is: `client.query(...)` to `client.mutation(....)`

## Token and headers customize

### Add token to http header
```typescript
let client = api({
    url: 'http://localhost:4000/graphql',
    headers: {
        Authorization: 'Bearer xxxx',
    }
});
```

### Customize http header
```typescript
let client = api({
    url: 'http://localhost:4000/graphql',
    headers: {
        Authorization: 'Bearer xxxx',
        ClientType: 'web',
        ...
    }
});
```
