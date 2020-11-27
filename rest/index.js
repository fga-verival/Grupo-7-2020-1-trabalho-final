const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.json({
        pinto: "rest"
    })
})

app.listen(3004);