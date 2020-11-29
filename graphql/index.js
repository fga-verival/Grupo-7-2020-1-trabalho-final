var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var schema = buildSchema(`
  
type User{
        nome: String
        conta: Int
        saldo: Int
}

type Transacao{
    valor: Int
    contaDestinatario: Int
    data: String
}

type Contato{
    nome: String
    conta: Int
}

type Limite{
    limite: Int
    limiteDisponivel: Int
}

type Emprestimo{
    valorElegivelParaEmprestimo: Int
}

type Pontos{
    pontos: Int 
}

type Query {
    test1: Int,
    login (email: String!, senha: String!): String,
    getUser(auth: String!): User,
    getTransacao(auth: String!): [Transacao],
    getContato(auth: String!): [Contato],
    getLimite(auth: String!): Limite,
    getEmprestimo(auth: String!): Emprestimo,
    getPontos(auth: String!): Pontos,
    }
`);

var root = {
  test1: () => {
    return 1;
  },
  login: (email, senha) => {
    return "123213";
  },
  getUser: (auth) => {
    return {
      nome: "João",
      conta: 111,
      saldo: 123,
    };
  },
  getTransacao: (auth) => {
    return [
      {
        valor: 123,
        contaDestinatario: 123,
        data: "1/1/2001",
      },
      {
        valor: 132,
        contaDestinatario: 132,
        data: "1/1/2003",
      },
      {
        valor: 321,
        contaDestinatario: 321,
        data: "1/1/2004",
      },
    ];
  },
  getContato: (auth) => {
    return [
      {
        nome: "Maria",
        conta: 123,
      },
      {
        nome: "Pedro",
        conta: 132,
      },
    ];
  },
  getLimite: (auth) => {
    return {
      limite: 400,
      limiteDisponivel: 135
    };
  },
  getEmprestimo: (auth) => {
    return {
        valorElegivelParaEmprestimo: 10000
    };
  },
  getPontos: (auth) => {
    return {
      pontos: 0
    };
  },
};

var app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3001);

module.exports = app;
