const os = require("os");
const { delay } = require('./utils');

function cpuAverage() {

    let totalIdle = 0;
    let totalTick = 0;

    const cpus = os.cpus();


    for (let i = 0, len = cpus.length; i < len; i++) {


        const cpu = cpus[i];


        for (type in cpu.times) {
            totalTick += cpu.times[type];
        }


        totalIdle += cpu.times.idle;
    }


    return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

const startMeasure = cpuAverage();


module.exports.getCpuUsage = async () => {

    await delay()

    const endMeasure = cpuAverage();

    const idleDifference = endMeasure.idle - startMeasure.idle;
    const totalDifference = endMeasure.total - startMeasure.total;

    const percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

    return percentageCPU;

}
