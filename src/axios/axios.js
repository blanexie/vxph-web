import axios from 'axios'
import crypto from 'crypto-js'
 
const instance = axios.create({
    baseURL: 'http://localhost:8018',
    timeout: 30000,
});

const userReq = {

    login: function (userName, password) {
        const timestamp = Date.now();
        const sign = crypto.SHA256(userName + "&" + password + "&" + timestamp)
        console.log(sign);
        return instance.get("/user/login?nickName=" + userName + "&timestamp=" + timestamp + "&sign=" + sign)
    }
}

export { userReq }