import { FileResource, TokenInfo } from "./class";
import crypto from 'crypto-js'
import { baseServerURL } from './request'

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

const fileToBase64 = (file: File, callback: Function) => {
    if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        // 转换成功
        reader.onload = (event) => {
            const base64Str = event.target?.result as string
            const fileResource = new FileResource()
            fileResource.file = file
            fileResource.hash = String(crypto.SHA1(base64Str))
            fileResource.base64 = base64Str
            fileResource.name = file.name
            fileResource.length = file.size
            fileResource.suffix = file.name.split('.').pop() ?? ""
            fileResource.url = "/api/resource/" + fileResource.hash + "." + fileResource.suffix
            callback({
                status: true,
                data: fileResource
            })
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
    const elements = tempDiv.getElementsByTagName('img');
    for (let element of elements) {
        let src = element.src
        let fs = files.get(src)
        if (fs) {
            element.src = fs.base64
        }
    }
    return tempDiv.innerHTML
}

function parseImgUrl(url: string | undefined): string {
    const token = localStorage.getItem("tokenInfo")
    let src = ''
    if (url && token) {
        const tokenInfo = JSON.parse(token) as TokenInfo
        if (url.startsWith("http") || url.startsWith("//")) {
            src = url
        } else if (url.startsWith("/")) {
            src = baseServerURL + url
        } else if (url.startsWith("data:")) {
            src = url
            return src
        } else {
            throw Error("无法识别的图片链接地址")
        }
        if (src.includes("?")) {
            src = src + "&" + tokenInfo.tokenName + "=" + tokenInfo.tokenValue
        } else {
            src = src + "?" + tokenInfo.tokenName + "=" + tokenInfo.tokenValue
        }
    }
    return src
}

export { duplicate, fileToBase64, modifyHTML, parseImgUrl }