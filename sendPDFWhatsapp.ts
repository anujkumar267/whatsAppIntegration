var axios, { AxiosRequestConfig } = require('axios');
var FormData = require('form-data');
var fs = require('fs');

var data = new FormData();
data.append('userid', '2000194708');
data.append('password', 'NJXmBjuE');
data.append('send_to', '917505259584');
data.append('msg', 'This is optional fallback SMS msg if fallback to SMS rule configured');
data.append('method', 'SendMediaMessage');
data.append('msg_type', 'document');
data.append('format', 'text');
data.append('media_file', fs.createReadStream('/home/anuj/Downloads/aktu2-2.pdf')); // upload the document
data.append('auth_scheme', 'plain');
data.append('v', '1.1');
data.append('caption', 'This is document');

//AxiosRequestConfig
var config: AxiosRequestConfig = {
  method: 'post',
  url: 'http://media.smsgupshup.com/GatewayAPI/rest',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    ...data.getHeaders()
  },
  data: data
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
