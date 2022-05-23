const checkSchema = (data, schema) => {
    const result = schema.validate(data, { convert: false })

    if (result.error) {
        const errorDetails = result.error.details.map((value) => ({
            error: value.message,
            // path: value.path,
        }))
        return errorDetails
    }
    return null
}

const validateBodySchema = (schema) => (req, res, next) => {
    const result = checkSchema(req.body, schema)

    if (result) {
        return res.status(400).send(result)
    }
    return next()
}

module.exports = validateBodySchema
