const NodeCache = require('node-cache')

const cache = new NodeCache()

module.exports.getCache = async (key) => {
    if (cache.has(key)) {
        const result = await cache.get(key)
        return result
    }
    return undefined
}

module.exports.setCache = async (key, value, ttl = 3600) => {
    cache.set(key, value, ttl)
}
