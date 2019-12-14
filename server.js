const express = require('express') // import express module

const app = express() // initiate express app
app.use(express.json()) // not sure what this is but without it POST cant read the JSON parameters from the body
const host = 'localhost' // host
const port = process.env.PORT || 1338 // pick port
const routePrefix = '/api/' // this is the route prefix used from where the APIs will be accesssed

const routes = { // define routes
    root: `${routePrefix}root`,
    test: `${routePrefix}test`,
    items: `${routePrefix}items`,
    item: `${routePrefix}items/:id`
}

// print details
function printDetails(currentRoute, requestMethod, requestParams, requestQuetyString) {
    console.info(currentRoute, requestMethod, requestParams, requestQuetyString)
}

// get root
app.get(routes.root, (req, res) => {
    printDetails(routes.root, req.method, req.params, req.query)
    res.send(routes.root)
})

// get test route
app.get(routes.test, (req, res) => {
    printDetails(routes.test, req.method, req.params, req.query)
    res.send(routes.test)
})

// for the web server
app.use(express.static('./public')) // this is where static files reside and need to be served to for the clientside app

// start the API server and Web server
app.listen(port, () => {
    console.info(`
    \nExpress Server started on port ${port}..
    APIs can be accessed at http://${host}:${port}${routePrefix}
    Web Server started on port http://${host}:${port}
    `)
})
