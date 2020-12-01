const xmlrpc = require('xmlrpc')

const mock = {
  nome: "João",
  conta: 111,
  saldo: 123,
  transacoes: [
      {
          valor: 123,
          contaDestinatario: 123,
          data: "1/1/2001"
      },

      {
          valor: 132,
          contaDestinatario: 132,
          data: "1/1/2003"
      },

      {
          valor: 321,
          contaDestinatario: 321,
          data: "1/1/2004"
      }
  ],
  contatos: [
      {
          nome: "Maria",
          conta: 123
      },

      {
          nome: "Pedro",
          conta: 132
      }
  ],
  limite: 400,
  limiteDisponivel: 135,
  valorElegivelParaEmprestimo: 10000,
  pontos: 0
}

var serverOptions = {
  host: 'localhost',
  port: 3005
}


var server = xmlrpc.createServer(serverOptions)

console.log('Iniciando')

server.on('getOne', function(err, params, callback) {
  console.log('Iniciando 2')
  callback(null, {number: 1})
})

server.on('getUserSession', function(err, params, callback) {
  callback(null, {userSession: '123'})
})

server.on('getNome', function(err, params, callback) {
  console.log('getNome')
  callback(null, mock.nome)
})

server.on('getTransacoes', function(err, params, callback) {
  callback(null, mock.transacoes)
})

server.on('getConta', function(err, params, callback) {
  callback(null, mock.conta)
})

server.on('getSaldo', function(err, params, callback) {
  callback(null, mock.saldo)
}) 

server.on('getContatos', function(err, params, callback) {
  callback(null, mock.contatos)
}) 

server.on('getLimite', function(err, params, callback) {
  callback(null, mock.limite)
}) 

server.on('getLimiteDisponivel', function(err, params, callback) {
  callback(null, mock.limiteDisponivel)
}) 

server.on('getValorElegivelParaEmprestimo', function(err, params, callback) {
  callback(null, mock.valorElegivelParaEmprestimo)
}) 

server.on('getPontos', function(err, params, callback) {
  callback(null, mock.pontos)
}) 

server.on('getUserInfo', function(err, params, callback) {
  callback(null, mock)
})
/*
for (let index = 0; index < 10; index++) {
  
setTimeout(function () {
    // Creates an XML-RPC client. Passes the host information on where to
    // make the XML-RPC calls.
    var client = xmlrpc.createClient({ host: 'localhost', port: 3005, path: '/'})
   
    // Sends a method call to the XML-RPC server
    client.methodCall('getNome', null, function(err, value) {
      console.log('nome: ' + value)
    })
    
    client.methodCall('getUserInfo', null, function(err, value) {
      console.log(value)
    })
    

    client.methodCall('getConta', null, function(err, value) {
      console.log('Conta: ' + value)
    })

    client.methodCall('getOne', null, function(err, value) {
      console.log('One: ' + value)
    })

    client.methodCall('getUserSession', null, function(err, value) {
      console.log('User Session: ' + value)
    })


   
  }, 5000)
}*/

module.exports = { server }