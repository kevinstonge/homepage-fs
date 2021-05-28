module.exports = (req, res, next) => {
    console.log(`path: ${req.url}; cookies: ${JSON.stringify(req.cookies)}; body: ${JSON.stringify(req.body)}`)
    next();
}