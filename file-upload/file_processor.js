const { parentPort, workerData } = require('worker_threads')
const mongoose = require('mongoose')
require('dotenv').config()
const {
    UserAccount,
    User,
    Agent,
    PolicyCategory,
    PolicyCarrier,
    Policy,
} = require('./src/models')
const { ErrorCodes, logger, getCache, setCache, CONST } = require('./src/utils')

async function getCategoryId(categoryName) {
    let categories = await getCache(CONST.cacheKeys.Category)
    if (!categories) {
        categories = await PolicyCategory.find({}).lean()
        setCache(CONST.cacheKeys.Category, categories)
    }

    const category = categories.find((ele) => ele.categoryName === categoryName)
    if (!category) {
        console.log('categoryName not found', categoryName)
        return ''
    }

    return category._id
}

async function getCompanyId(companyName) {
    let companies = await getCache(CONST.cacheKeys.Company)
    if (!companies) {
        companies = await PolicyCarrier.find({}).lean()
        setCache(CONST.cacheKeys.Company, companies)
    }

    const company = companies.find((ele) => ele.companyName === companyName)

    if (!company) {
        console.log('company not found', companyName)
        return ''
    }
    return company._id
}

async function processRecords(data) {
    try {
        const user = await User.create({
            firstName: data.firstname,
            dateOfBirth: data.dob,
            email: data.email,
            gender: data.gender,
            phoneNumber: data.phone,
            state: data.state,
            zipCode: data.zip,
            userType: data.userType,
        })

        const [categoryId, companyId] = await Promise.all([
            getCategoryId(data.category_name),
            getCompanyId(data.company_name),
        ])

        await Policy.create({
            policyNumber: data.policy_number,
            policyStartDate: data.policy_start_date,
            policyEndDate: data.policy_end_date,
            policyCategory: categoryId,
            policyCarrier: companyId,
            user: user._id,
        })
    } catch (error) {
        console.log(error)
    }
}

async function processFile() {
    const { json } = workerData

    console.log('request received')

    await mongoose.connect(process.env.MONGO_CONNECION_STRING)

    const agents = [...new Set(json.map((ele) => ele.agent))].map((agent) => {
        return Agent.updateOne(
            { agentName: agent },
            { $set: { agentName: agent } },
            { upsert: true }
        )
    })

    await Promise.all(agents)

    const categories = [...new Set(json.map((ele) => ele.category_name))].map(
        (category) => {
            return PolicyCategory.updateOne(
                { categoryName: category },
                { $set: { categoryName: category } },
                { upsert: true }
            )
        }
    )

    await Promise.all(categories)

    const carriers = [...new Set(json.map((ele) => ele.company_name))].map(
        (company) => {
            return PolicyCarrier.updateOne(
                { companyName: company },
                { $set: { companyName: company } },
                { upsert: true }
            )
        }
    )

    await Promise.all(carriers)

    const chunkSize = 25;
      for (let i = 0; i < json.length; i += chunkSize) {
        const chunk = json.slice(i, i + chunkSize)
        const promises = chunk.map((ele) => processRecords(ele));
        await Promise.all(promises)
    }

    // return 'done';
    parentPort.postMessage({ done: true })
}

processFile()

// module.exports = {processFile}
