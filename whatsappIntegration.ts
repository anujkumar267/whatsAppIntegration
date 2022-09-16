import axios, { AxiosRequestConfig, Method } from 'axios';
import FormData from 'form-data';
import DB from '@databases';

let userDetail;
class whatsappService {
  public users = DB.User;

  public GUPSHUP_USER_ID = "2000194708";
  // const GUPSHUP_PASSWORD = "CaBBrPcf";
  public GUPSHUP_PASSWORD = "NJXmBjuE";
  public GUPSHUP_USER_ID_2WAY = "2000194709";
  public GUPSHUP_PASSWORD_2WAY = "nRbHc5K#";
  public GUPSHUP_API_VERSION = "1.1";
  public GUPSHUP_API_URL = "WHATSAPP";

  // find the detail of users 
  public async finduser() {
    // console.log("Enter the function")
    userDetail = await this.users.findOne({
      attributes: ['username', 'phone_number'],
      where: {
        id: 8,
      }
    });
    this.sendMessage();
    console.log(userDetail);

  }

  // opt-in function 
  public optIN() {
    var data = new FormData();
    data.append('userid', this.GUPSHUP_USER_ID);
    data.append('password', this.GUPSHUP_PASSWORD);
    data.append('phone_number', userDetail.phone_number);
    data.append('method', 'OPT_IN');
    data.append('format', 'json');
    data.append('auth_scheme', 'plain');
    data.append('v', this.GUPSHUP_API_VERSION);
    data.append('channel', 'whatsapp');

    let m: Method = 'post'
    var config: AxiosRequestConfig = {
      method: m,
      url: 'https://media.smsgupshup.com/GatewayAPI/rest',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...data.getHeaders()
      },
      data: data
    };
    //  AxiosRequestConfig
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  // send Message function
  public sendMessage() {

    const msg = `Dear ${userDetail.username}, Greetings from Hospals! We will be happy to assist you for your treatment in India. Kindly share your medical reports with us via mail, WhatsApp, IMO, Viber, or Facebook. We will get back to you with our Experts\' opinion, personalised treatment plan and estimate within 24 hours. Patients Relation Team Hospals`

    // userDetail.user``
    var data = new FormData();
    data.append('userid', this.GUPSHUP_USER_ID);
    data.append('password', this.GUPSHUP_PASSWORD);
    data.append('send_to', userDetail.phone_number);
    data.append('method', 'SendMessage');
    data.append('msg_type', 'text');
    data.append('format', 'json');
    data.append('auth_scheme', 'plain');
    data.append('v', this.GUPSHUP_API_VERSION);
    data.append('msg', msg);

    this.optIN();
    var config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://media.smsgupshup.com/GatewayAPI/rest',
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

  }
}

export default whatsappService;