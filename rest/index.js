const express = require('express');

var app = express();
var auth = 0;
const resposta = {
    "nome": "João",
    "conta": 111,
    "saldo": 123,
    "transacoes": [
        {
            "valor": 123,
            "conta-destinatario": 123,
            "data": "1/1/2001"
        },
        {
            "valor": 132,
            "conta-destinatario": 132,
            "data": "1/1/2003"
        },
        {
            "valor": 321,
            "conta-destinatario": 321,
            "data": "1/1/2004"
        }

    ],
    "contatos": [
        {
            "nome": "Maria",
            "conta": 123
        },
        {
            "nome": "Pedro",
            "conta": 132
        }

    ],
    "limite": 400,
    "limiteDisponivel": 135,
    "valorElegivelParaEmprestimo": 10000,
    "pontos": 0
}

app.get('/simple', (req, res) => {
    res.status(200).send({ teste1: 1 });
})

app.post('/auth', (req, res) => {

    auth = 1;
    res.status(200).send({
        code: '200',
        message: 'User authenticated'
    });


})

app.get('/clients', (req, res) => {
    res.status(200).send(resposta)
})

app.listen(3004);
