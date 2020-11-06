# react-native-utils-request-api

## Usage
```javascript
import {request, CODE} from 'react-native-utils-request-api';

request({
    domain: '<Domain>',
    url: '<Api url>',
    authorization: 'JWT Token',
    method: 'GET',
    params: {},
    options: { json: true },
  })
    .toPromise()
    .then((res) => {})
    .catch((err) => {});
