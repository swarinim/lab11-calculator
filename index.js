add = require('./add.js')
sub = require('./sub.js')
mul = require('./mul.js')
div = require('./div.js')

var express = require('express')

const fs = require('fs');

var html = ""
var result = "RESULT WILL APPEAR HERE"
var val1 = 0
var val2 = 0

fs.readFile('./index.html', (err, data) => {
    if (err) {
        console.log("Error: Could not read file.")
        throw err
    }

    html = data.toString()
})


const server = express()

server.use(express.urlencoded({
  extended: true
}))

function template(html, result, val1, val2) {
    return html.replace('{{RESULT}}', result)
               .replace('{{VALUE1}}', val1)
               .replace('{{VALUE2}}', val2)
}

function operate(oper, val1, val2) {
    switch (oper) {
    case '+':
        return add(val1, val2)
    case '-':
        return sub(val1, val2)
    case '*':
        return mul(val1, val2)
    case '/':
        return div(val1, val2)
    }
}

server.get('/', (req, res) => {
    res.writeHeader(200, {"Content-Type": "text/html"})
    res.write(template(html, result, val1, val2))
})

server.post('/', (req, res) => {
    res.writeHeader(200, {"Content-Type": "text/html"})
    res.write(template(html,
                       req.body.val1 + " " + req.body.oper + " " + req.body.val2 + " = " +
                       operate(req.body.oper, parseFloat(req.body.val1), parseFloat(req.body.val2)),
                       req.body.val1, req.body.val2))
})

server.listen(3000)
