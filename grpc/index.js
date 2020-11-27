const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.json({
        pinto: "grpc"
    })
})

app.listen(3002);