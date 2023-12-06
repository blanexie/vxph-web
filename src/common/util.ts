
import { FileResource } from "./class";
import crypto from 'crypto-js'
import { baseServerURL } from '../common/request'
const duplicate = (a: any[], func: Function) => {
    const uniqueFields = new Set();
    return [...a].filter(it => {
        if (uniqueFields.has(func(it))) {
            return false
        } else {
            uniqueFields.add(func(it))
            return true
        }
    })
}

function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

const fileToBase64 = (file: File, callback: Function) => {
    if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        // 转换成功
        reader.onload = (event) => {
            const response = new FileResource()
            response.file = file
            response.hash = String(crypto.SHA1(event.target.result))
            response.base64 = reader.result as string
            response.name = file.name
            response.length = file.size
            response.suffix = file.name.split('.').pop() ?? ""
            response.url = baseServerURL + "/api/resource/" + response.hash + "." + response.suffix
            callback(response)
        };
        // 转换失败
        reader.onerror = function () {
            const response = {
                status: false,
                data: reader.error
            }
            callback(response);
        };
    }
}

function modifyHTML(html: string, files: Map<String, FileResource>) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const imgs = tempDiv.getElementsByTagName('img');
    for (let index = 0; index < imgs.length; index++) {
        const element = imgs[index];
        let src = element.src
        let fs = files.get(src)
        if (fs) {
            element.src = fs.base64
        }
    }
    return tempDiv.innerHTML
}


function parseImgUrl(url: string | undefined) {
    let src = ''
    if (url) {
        if (url.startsWith("http") || url.startsWith("//")) {
            src = url
        } else if (url.startsWith("/")) {
            src = baseServerURL + "" + url
        } else if (url.startsWith("data:")) {
            src = url
        } else {
            throw Error("无法识别的图片链接地址")
        }
        const satoken = localStorage.getItem("satoken")
        if (src.includes("?")) {
            src = src + "&satoken=" + satoken
        } else {
            src = src + "?satoken=" + satoken
        }
    }
    return src
}

export { duplicate, fileToBase64, generateRandomString, modifyHTML, parseImgUrl } 