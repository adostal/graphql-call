# GraphQL Call

> Library for call GraphQL API.

## Install

`npm i graphql-call isomorphic-fetch --save`

## Usage

### Simple query
```typescript
import 'isomorphic-fetch';
import api, {GraphQLCall} from "graphql-call";

let client = api({url: 'http://localhost:4000/graphql'});

/**
* Translate to:
* query {
*   users {
*       id
*   }
* }
*/
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
```typescript
let filter = {search: "Test"}
/**
* Translate to:
* query {
*   users(search: "Test") {
*       id
*   }
* }
*/
client.query({
    users: {
        variables: filter,
        result: 'id'
    }
});
```