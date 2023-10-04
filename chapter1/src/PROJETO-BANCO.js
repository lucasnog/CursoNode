const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());
app.listen(3333);

var clientes = [];

//middleware

function cpfUsuarioExiste(request, response, next) {

    const { cpf } = request.headers;
    const cliente = clientes.find((cliente) => cliente.cpf === cpf);

    if (!cliente) {
        return response.status(400).json({ error: 'cliente não encontado' })
    }

    request.cliente = cliente;
    return next();
}
function getBalance(extrato) {
    const balance = extrato.reduce((acc, atual) => {
        if (atual.type === 'credito') {
            return acc + atual.qtd;
        } else {
            return acc - atual.qtd;
        }
    }, 0);
    return balance;
};

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const clienteJaExiste = clientes.some((cliente) => cliente.cpf === cpf)

    if (clienteJaExiste) {
        return response.status(400).json({ error: 'Cliente já cadastrado.' });
    }

    const id = uuidv4();
    clientes.push({
        cpf,
        name,
        id,
        extrato: []
    });


    console.log(clientes[clientes.length - 1].name + ' foi cadastrado com sucesso.')
    return response.status(201).json(clientes[clientes.length - 1].name + " cadastrado com sucesso");
});

app.get("/extrato/", cpfUsuarioExiste, (request, response) => {
    const { cliente } = request;
    return response.json(cliente.extrato);

});

app.post("/deposit/", cpfUsuarioExiste, (request, response) => {
    const { cliente } = request;
    const { descricao, qtd } = request.body;

    const extratoOp = cliente.extrato.push({
        descricao,
        qtd,
        dataCriacao: new Date(),
        type: "credito",
    });
    console.log('O cliente ' + cliente.name + ' depositou uma quantia de ' + qtd + ' ' + cliente.extrato[cliente.extrato.length - 1].dataCriacao);
    return response.status(201).json('Foi realisado um deposito de ' + qtd);
});

app.post("/saque/", cpfUsuarioExiste, (request, response) => {
    const { cliente } = request;
    const { qtd } = request.body;
    const balance = getBalance(cliente.extrato);
    if (balance < qtd) {

        return response.status(400).json('O cliente ' + cliente.name + ' não tem saldo suficiente');

    } else {

        const extratoOp = cliente.extrato.push({
            qtd,
            dataCriacao: new Date(),
            type: "debito",
        });

        console.log(getBalance(cliente.extrato));
        return response.status(201).json('O cliente ' + cliente.name + ' sacou um total de ' + qtd);
    }
});

app.get("/extrato/data", cpfUsuarioExiste, (request, response) => {
    const { cliente } = request;
    const { data } = request.query;

    const dataFormat = new Date(data + " 00:00");

    const extratoDia = cliente.extrato.filter((extrato) => extrato.dataCriacao.toDateString() === new Date(dataFormat).toDateString())
    return response.json(extratoDia);
});

app.put("/account/alterar", cpfUsuarioExiste, (request, response) => {
    const { cliente } = request;
    const { name } = request.body;

    cliente.name = name;

    return response.status(201).json({ message: 'Dados cadastrais atualizados com sucesso.' })

})

app.get("/account", cpfUsuarioExiste, (request, response) => {
    const { cliente } = request;

    return response.json(cliente);
})

app.delete("/account", cpfUsuarioExiste, (request, response) => {
    const { cliente } = request;

    clientes.splice(cliente, 1);
    console.log("o cliente: " + cliente.name + " foi deletado com sucesso.")
    return response.status(200).json(clientes)
})