# GraphQL Call

> Library for call GraphQL API.

## Install

`npm i graphql-call isomorphic-fetch --save`

## Use

```typescript
import 'isomorphic-fetch';
import api, {GraphQLCall} from "graphql-call";

let client = api({url: 'http://localhost:4000/graphql'});

/**
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