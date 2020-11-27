const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.json({
        pinto: "yes"
    })
})

app.listen(3000);