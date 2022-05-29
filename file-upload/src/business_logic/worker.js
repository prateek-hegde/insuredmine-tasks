const { parentPort, workerData } = require('worker_threads')

const { processFile } = require('./file_processor')

;(async function () {
    await parentPort.postMessage(processFile(workerData.json))
})()
