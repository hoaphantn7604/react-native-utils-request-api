import RNFetchBlob from 'rn-fetch-blob';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const UrlParamater = {
  encode: (data: object) => {
    if (!data || typeof data !== 'object') {
      return '';
    }
    return `?${Object.entries(data)
      .map((entry: any[]) => `${entry[0]}=${entry[1]}`)
      .join('&')}`;
  },
};

export interface configs {
  domain?: string;
  url: string;
  authorization?: string | any;
  params?: any;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  options?: {
    json?: boolean;
    formData?: boolean;
    formUrlEncoded?: boolean;
  };
  id?: any;
}

export const request = (configs: configs) => {
  let header = {
    'Content-type': 'application/x-www-form-urlencoded',
  };

  if (configs.authorization && configs.authorization.length > 0) {
    header['Authorization'] = configs.authorization;
  }

  configs.url = `${configs.domain}/${configs.url}`;

  if (configs.method === 'GET' && configs.params) {
    configs.url += UrlParamater.encode(configs.params);
  }

  if (configs.method === 'DELETE' || configs.method === 'PUT') {
    configs.url = `${configs.url}/${configs.id}`;
  }

  if (
    configs.params &&
    (configs.method === 'POST' || configs.method === 'PUT' || configs.method === 'DELETE')
  ) {
    if (configs.options?.json) {
      configs.params = JSON.stringify(configs.params);
      header['Content-type'] = 'application/json';
    } else if (configs.options?.formData) {
      header['Content-type'] = 'multipart/form-data';
    } else {
      header['Content-type'] = 'application/x-www-form-urlencoded';
      configs.params = Object.entries(configs.params).reduce((body, entry) => {
        body.push({ name: entry[0], data: entry[1] });
        return body;
      }, [] as any[]);
    }
  }

  console.log('log-url: ', configs.url);
  console.log('log-method: ', configs.method);
  console.log('log-header: ', header);
  console.log('log-prams: ', configs.params);
  const req =
    configs.method === 'POST' || configs.method === 'PUT' || configs.method === 'DELETE'
      ? RNFetchBlob.fetch(configs.method, configs.url, header, configs.params)
      : RNFetchBlob.fetch(configs.method, configs.url, header);

  return from(req).pipe(
    map((response) => {
      console.log('log-response: ', response);
      return response.json();
    }),
  );
};
