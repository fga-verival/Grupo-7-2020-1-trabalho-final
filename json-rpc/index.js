const express = require('express');
const bodyParser = require('body-parser')
const { JSONRPCServer } = require('json-rpc-2.0')

var app = express();

const server = new JSONRPCServer();

app.use(bodyParser.json());


const obj = {
    "nome": "João",
    "conta": 111,
    "userSession": "123",
    "saldo": 123,
    "transacoes": [
        {
            "valor": 123,
            "contaDestinatario": 123,
            "data": "1/1/2001" 
        },
        {
            "valor": 132,
            "contaDestinatario": 132,
            "data": "1/1/2003" 
        },
        {
            "valor": 321,
            "contaDestinatario": 321,
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

server.addMethod("simples", ({cpf, pwd}) => 1)
server.addMethod("auth", ({cpf, pwd}) => {
                              if(cpf && pwd)return {cpf:cpf,message:'User authenticated'}
                              else return "Not authorized"
                            })
server.addMethod("data", ({cpf, pwd}) => obj)

app.post('/', (req, res) => {
  const jsonRPCRequest = req.body;

  server.receive(jsonRPCRequest).then(jsonRPCResponse => {
    if(jsonRPCResponse){
      res.json(jsonRPCResponse)
    }
    else{
      res.sendStatus(204)
    }
  })
  
})

app.listen(3003);
