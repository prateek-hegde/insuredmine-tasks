const { parentPort, workerData } = require('worker_threads');
const csvtojson = require('csvtojson')

async function readCsv() {
    const { csvData } = workerData;
    const json = await csvtojson().fromString(csvData)
    parentPort.postMessage(json)
}

readCsv();