const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.json({
        pinto: "json-rpc"
    })
})

app.listen(3003);