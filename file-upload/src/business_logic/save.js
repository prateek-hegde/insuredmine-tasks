const { Worker } = require('worker_threads')
const { logger } = require('../utils')

const processFile = async (csvData) => {
    const json = await convertJsonToCsv(csvData)

    return new Promise((resolve, reject) => {
        const worker = new Worker(`${__dirname}/file_processor.js`, {
            workerData: { json: json },
        })

        worker.on('message', (message) => {
            logger.debug(message)
            if (message.errorRecords.length) {
                // TODO inform the stake holder
            }
            resolve(`completed`)
        })
        worker.on('error', (error) => {
            logger.error(error)
            reject(error)
        })
    })
}

const convertJsonToCsv = async (csvData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`${__dirname}/read_csv.js`, {
            workerData: { csvData: csvData },
        })
        worker.on('message', (json) => {
            return resolve(json)
        })
        worker.on('error', (error) => {
            reject(error)
        })
    })
}

const saveUserData = async (req, res) => {
    res.once('finish', async () => {
        await processFile(req.files.csvfile.data.toString('utf8'))
        logger.info('completed')
    })

    return res.status(202).send('In Progress')
}

module.exports = {
    saveUserData,
}
