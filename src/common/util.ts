
import { FileResource } from "./class";
import router from "../common/route"
import crypto from 'crypto-js'

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
        reader.onload = () => {
            console.log(file)
            const response = new FileResource()
            response.file = file
            response.hash = String(crypto.SHA1(file))
            response.base64 = reader.result as string
            response.name = file.name
            response.length = file.size
            response.suffix = file.name.split('.').pop() ?? ""
            response.url = "/api/resource/" + response.hash + "." + response.suffix
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

function findHost() {
    let currentUrl = window.location.href;
    let cu = currentUrl.split('://')
    let urlPrefix = cu[1].split('/')[0];
    let host = cu[0] + "://" + urlPrefix
    return host
}

function modifyHTML(html: string, fileMap: Map<String, FileResource>) {
    const host = findHost()
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const imgs = tempDiv.getElementsByTagName('img');
    for (let index = 0; index < imgs.length; index++) {
        const element = imgs[index];
        if (element.src.startsWith(host)) {
            let src = element.src.replace(host, "")
            const fileResource = fileMap.get(src)
            if (fileResource) {
                element.src = fileResource.base64
            }
        }
    }
    return tempDiv.innerHTML
}

const toRouter = (e: { index: string; } | string) => {
    if (typeof e == 'string') {
        router.push(e)
    } else {
        router.push(e.index)
    }
}
export { duplicate, fileToBase64, generateRandomString, modifyHTML, toRouter } 