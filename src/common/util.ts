
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


export { duplicate } 