
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


const fileToBase64 = (file, callback) => {
    if (window.FileReader) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        // 转换成功
        reader.onload = () => {
            const response = {
                status: true,
                data: reader.result
            }
            callback(response);
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



export { duplicate, fileToBase64 } 