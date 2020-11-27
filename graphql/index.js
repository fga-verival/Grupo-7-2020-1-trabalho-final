const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.json({
        pinto: "graphql"
    })
})

app.listen(3001);