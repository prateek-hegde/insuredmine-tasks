const express = require("express");
const cron = require("node-cron");
const { getCpuUsage } = require('./cpu');
const {delay} = require('./utils');
const app = express();

const PORT = 3000;


app.get('/', (req, res) => {
    return res.send({
        status: 'ok',
        uptime: `${process.uptime()}s`
    })
})

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received. closing the server');
    server.close()
});

cron.schedule("* * * * *", async () => {
    const cpuUsageReadingOne = await getCpuUsage();
    await delay(5000);
    const cpuUsageReadingtwo = await getCpuUsage();
    if (cpuUsageReadingOne > 70 && cpuUsageReadingtwo > 70) {
        process.exit(0)
    }

});

const server = app.listen(PORT, () => {
    console.log(`server is running on  port ${PORT}`);
})

