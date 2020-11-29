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

module.exports = { mock };