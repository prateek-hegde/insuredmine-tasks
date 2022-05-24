const { Worker } = require('worker_threads')
const Piscina = require('piscina')
const { logger } = require('../utils')

const processFile = async (csvData) => {
    const json = await convertJsonToCsv(csvData)

    // const chunkSize = 750;

    // const chunkedArray = [];
    // for (let i = 0; i < json.length; i += chunkSize) {
    //     const chunk = json.slice(i, i + chunkSize)
    //     chunkedArray.push(chunk);
    // }

    // const pool = new Piscina();
    // const options = { filename: './file_processor2.js' };

    // const promises = chunkedArray.map((ele) => pool.run(ele, options));

    // await Promise.all(promises);

    return new Promise((resolve, reject) => {
        const worker = new Worker(`./file_processor.js`, {
            workerData: { json: json },
        })

        worker.on('message', (message) => {
            resolve('completed' + message)
        })
        worker.on('error', (error) => {
            logger.error(error)
            reject('error')
        })
    })
}

const convertJsonToCsv = async (csvData) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(`./read_csv.js`, {
            workerData: { csvData: csvData },
        })
        worker.on('message', (json) => {
            return resolve(json)
        })
        worker.on('error', (error) => {
            reject('error')
        })
    })
}

const saveUserData = async (req, res) => {
    res.once('finish', async () => {
        console.time('start')
        await processFile(req.files.csvfile.data.toString('utf8'))
        logger.info('completed')
        console.timeEnd('start')
    })

    return res.status(202).send('In Progress')
}

module.exports = {
    saveUserData,
}
