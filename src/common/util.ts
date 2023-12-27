import {FileResource, TokenInfo} from "./class";
import crypto from 'crypto-js'
import {baseServerURL} from './request'

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

function getHostPrefix(): string {
    const fullUrl = window.location.href; // 获取当前页面的完整URL
    const protocolIndex = fullUrl.indexOf('//'); // 查找协议的位置
    const prefixIndex = fullUrl.indexOf('/', protocolIndex + 2); // 查找主机前缀的位置
    return fullUrl.substring(0, prefixIndex); // 返回主机前缀的子字符串
}

const fileToBase64 = (file: File): Promise<FileResource | string> => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
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
            resolve(fileResource)
        };
        // 转换失败
        reader.onerror = function (event) {
            reject(event.target?.result)
        };
    })
}

function modifyHTML(html: string, files: Map<String, FileResource>) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const elements = tempDiv.getElementsByTagName('img');
    for (let element of elements) {
        let src = element.src
        const hostPrefix = getHostPrefix()
        if (src.startsWith(hostPrefix)) {
            src = src.replace(hostPrefix, "")
        }
        let fs = files.get(src)
        if (fs) {
            element.src = fs.base64!
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

export {duplicate, fileToBase64, modifyHTML, parseImgUrl}