const mongoose = require('mongoose')
require('dotenv').config()

const {
    Agent,
    User,
    Policy,
    PolicyCarrier,
    PolicyCategory,
} = require('./src/models')

async function main() {
    await mongoose
    .connect(process.env.MONGO_CONNECION_STRING);
    console.log('db connected');
    await Promise.all([
        Agent.deleteMany(),
        User.deleteMany(),
        Policy.deleteMany(),
        PolicyCarrier.deleteMany(),
        PolicyCategory.deleteMany(),
    ])
    console.log('done');
    process.exit(0)
}

main()