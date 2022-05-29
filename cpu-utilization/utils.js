module.exports.delay = (ms = 100) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve()
        }, ms)
    })
}