# react-native-utils-request-api

## Getting started

`$ yarn add react-native-utils-request-api`

## Dependencies
```javascript
 yarn add rn-fetch-blob
 cd ios && pod install && cd ../
```

## Usage
```javascript
import {request, CODE} from 'react-native-utils-request-api';

request({
    domain: '<Domain>',
    url: '<Api url>',
    authorization: '<Token>',
    method: '<Method>',
    params: {},
    options: { json: true },
  })
    .toPromise()
    .then((res) => {})
    .catch((err) => {});
```
