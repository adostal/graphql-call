/// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts" />

declare function require(name: string): any;

require('isomorphic-fetch');
const fetchMock = require('fetch-mock');

import call from "../";

describe('GraphQL Call Tests', () => {

    it('Simple query', () => {
        // FIXME - write test across fetch-mock
        //fetchMock.mock('test', 200);
        call({url: 'http://localhost:4000/graphql'}).query({
            users: {
                result: 'id'
            }
        }).then((res:any) => {
            console.log('res')
        }).catch((err:any) => {
            console.error('error: ', err);
        });
    });

});
