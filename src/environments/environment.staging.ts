// const api_endpoint = '';
// const websocket_api_endpoint = '';
// export const environment = {
//   production: false,
//   api_endpoint,
//   file_uplod_endpoint: `${api_endpoint}/upload/`,
//   graphql_endpoint: `${api_endpoint}/graphql/`,
//   websocket_graphql_endpoint: `${websocket_api_endpoint}/graphql/`,
// };

const api_endpoint = 'https://<URL>';
const websocket_api_endpoint = 'wss://<URL>';
const cloudinary_endpoint = 'https://api.cloudinary.com/v1_1/<bucket-name>';
const cloudinary_preset = '';

export const environment = {
  production: true,
  api_endpoint,
  file_uplod_endpoint: `${cloudinary_endpoint}/upload/`,
  cloudinary_preset,
  graphql_endpoint: `${api_endpoint}/graphql/`,
  websocket_graphql_endpoint: `${websocket_api_endpoint}/graphql/`,
  recaptcha_site_key: '6LcCWfIUAAAAALvgSsvP9dKFqC1EtVtkj0IQBC5y',
};
