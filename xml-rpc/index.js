const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.json({
        pinto: "xml-rpc"
    })
})

app.listen(3005);