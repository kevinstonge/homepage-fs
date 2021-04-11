const db = require('../../../data/dbConfig.js')
module.exports = async (req, res, next) => {
    try {
        const skill = await db('skills').where({ id: req.params.id });
        if (skill.id === req.params.id) {
            next()
        }
        else {
            res.status(404).json({message: `no skill with that id (${req.params.id} exists`})
        }
    }
    catch (err) {
        res.status(500).json({message: "error accessing skill in database, no changes have been made"})
    }
}