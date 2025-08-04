import { formatDate } from "@angular/common";

import * as CryptoJS from 'crypto-js';

import { environment } from "src/environments/environment";



export const Base = {

// cgmsc api
    baseUrl: 'https://www.cgmsc.gov.in/himis_apin/api/WebCgmsc/',

    baseurl_: 'https://www.cgmsc.gov.in/himis_apin/api/',

 


    // https://dpdmis.in/cdn/News/

    currency: 'INR',
    date_time_validator: 'dd-MMM-yyyy, hh:mm a',
    date_validator: 'dd/MM/yyyy',
    EmailValidator:'^(((\\+91-?)|0)?[0-9]{10})$|^([a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4})$',
    MobileValidator:'^((\\+91-?)|0)?[0-9]{10}$',
    PasswordValidator:'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$',
    decimal_point_in_currency: 2,


    key: CryptoJS.enc.Utf8.parse(environment.EncryptKey),
    iv: CryptoJS.enc.Utf8.parse(environment.EncryptIV),


    encryptUsingAES256(text: any): any {
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), this.key, {
          keySize: 128 / 8,
          iv: this.iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
      },
      decryptUsingAES256(decString: any) {
        try {
          var decrypted = CryptoJS.AES.decrypt(decString, this.key, {
            keySize: 128 / 8,
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          });
          return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (e) {
        }
        return null;
      },
      convert_HexToString(hex: any) {
        hex = hex.toString();//force conversion
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str
      },

    // imageUrl: 'https://bihav.co.in/Uploads/Restaurant',
    // offerUrl: 'https://bihav.co.in/Uploads/Offer_image',
    // ItemUrl: 'https://bihav.co.in/Uploads/Item_image',
    // logoUrl: 'https://bihav.co.in/Uploads/Restaurant',
    // img_urlseva: 'http://sevagudiadmin.shivaminfosoft.in/uploads/products',
    // adminAppUrl: 'https://bihav.co.in',
    // webAppUrl: 'https://bihav.co.in',
    
}
