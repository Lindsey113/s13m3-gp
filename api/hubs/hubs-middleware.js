const Hubs = require('./hubs-model')

async function checkHubId(req, res, next) {
    try {
        const hub = await Hubs.findById(req.params.id)
        if (hub) {
            req.hub = hub
            next()
        }
    } catch (err) {
        next({
            status: 404,
            message: `Hub ${req.params.id} not found`
        })
    }
}

function checkNewHub(req, res, next) {
    const { name } = req.body
    if (
        name !== undefined &&
        typeof name === 'string' &&
        name.length &&
        name.trim().length
    ) {
        next()
    } else {
        next({ status: 422, message: "Hubs need a name"})
     }
}

module.exports = {
    checkHubId,
    checkNewHub
}