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