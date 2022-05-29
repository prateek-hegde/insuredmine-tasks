const {
    ErrorCodes,
    logger,
    createPageMetaData,
    createPagination,
} = require('../utils')
const { User, Policy } = require('../models')

module.exports.getPolicyInfo = async (req, res, next) => {
    const { userName } = req.params
    try {
        const user = await User.findOne({ firstName: userName }).lean()
        if (!user) {
            return res.send('invalid user')
        }

        const result = await Policy.find({ user: user._id }, { user: 0 })
            .populate('policyCarrier')
            .populate('policyCategory')

        return res.send(result)
    } catch (error) {
        logger.error(
            `business_logic/search.js: getPolicyInfo() ${error} | ${JSON.stringify(
                error
            )}`
        )
        return next(ErrorCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports.getPolicyByUser = async (req, res, next) => {
    const { skip, limit } = createPagination(req.query)

    try {
        const [totalRecors, data] = await Promise.all([
            Policy.aggregate([
                {
                    $group: {_id: "$user"},
                },
            ]),
            Policy.aggregate([
                {
                    $lookup: {
                        from: 'User',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $unwind: '$user',
                },
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                },
                {
                    $lookup: {
                        from: 'PolicyCategory',
                        localField: 'policyCategory',
                        foreignField: '_id',
                        as: 'policyCategory',
                    },
                },
                {
                    $unwind: '$policyCategory',
                },
                {
                    $lookup: {
                        from: 'PolicyCarrier',
                        localField: 'policyCarrier',
                        foreignField: '_id',
                        as: 'policyCarrier',
                    },
                },
                {
                    $unwind: '$policyCarrier',
                },
                {
                    $group: {
                        _id: '$user.firstName',
                        policies: {
                            $push: {
                                policyNumber: '$policyNumber',
                                policyStartDate: '$policyStartDate',
                                policyEndDate: '$policyEndDate',
                                policyCategory: '$policyCategory.categoryName',
                                policyCarrier: '$policyCarrier.companyName',
                            },
                        },
                    },
                },
            ]),
        ])

        const paginationMetaData = createPageMetaData(
            totalRecors.length,
            req.query
        )

        return res.send({
            paginationMetaData,
            data,
        })
    } catch (error) {
        logger.error(
            `business_logic/search.js: getPolicyInfo() ${error} | ${JSON.stringify(
                error
            )}`
        )
        return next(ErrorCodes.INTERNAL_SERVER_ERROR)
    }
}

/**
 * const result = await User.aggregate([
            {
                $match: {
                    firstName: userName,
                },
            },
            {
                $lookup: {
                    from: 'Policy',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'policy',
                },
            },
            {
                $unwind: {
                  path: "$policy",
                  preserveNullAndEmptyArrays: true
                }
              },
              {
                $lookup: {
                    from: 'PolicyCategory',
                    localField: 'policy.policyCategory',
                    foreignField: '_id',
                    as: 'policy.policyCategory',
                },
                $lookup: {
                    from: 'PolicyCarrier',
                    localField: 'policy.policyCarrier',
                    foreignField: '_id',
                    as: 'policy.policyCarrier',
                },
              }
            
        ])
 */
