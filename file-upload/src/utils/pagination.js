const createPagination = ({ page, limit }) => {
    const query = {}

    if (!page || !limit) {
        return {
            skip: 0,
            limit: 50,
        }
    }

    const pageNumber = parseInt(page) || 1

    if (pageNumber < 0 || pageNumber === 0) {
        throw {
            statusCode: 422,
            code: 'INVALID_PAGE_NUMBER',
            message: 'Invalid Page Number',
        }
    }

    query.skip = Math.ceil(limit * (pageNumber - 1))
    query.limit = parseInt(limit) || 50

    return query
}

const createPageMetaData = (totalRecords, { page, limit }) => {
    const totalPages = Math.ceil(totalRecords / (+limit || 50)) // update to ES6

    const pageMetaData = {
        totalPages,
        totalRecords,
        limit: +limit || 50,
        page: +page || 1, // update to ES6
    }

    return pageMetaData
}

module.exports = { createPagination, createPageMetaData }
