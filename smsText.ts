var axios, { AxiosRequestConfig } = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('userid', '2000194708');
data.append('password', 'NJXmBjuE');
data.append('send_to', '917505259584');
data.append('msg', '435854 is your Hospals login OTP. The code will be valid for 10 min. Do not share this OTP with anyone.');
data.append('method', 'SendMessage');
data.append('msg_type', 'text');
data.append('format', 'json');
data.append('auth_scheme', 'plain');
data.append('v', '1.1');

var config: AxiosRequestConfig = {
  method: 'post',
  url: 'https://enterprise.smsgupshup.com/GatewayAPI/rest',
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
