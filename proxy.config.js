const PROXY_CONFIG = [
  {
    context: '/api',
    target: 'https://localhost:15082/api',
    pathRewrite: {'^/api' : ''}
  }
];

module.exports = PROXY_CONFIG;
