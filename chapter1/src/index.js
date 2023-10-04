const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(express.json());
app.listen(3333);

const costumers = [];
function cpfAccountExists(request, response, next) {
    const { cpf } = request.headers;
    const costumer = costumers.find((costumer) => costumer.cpf === cpf);
    if (!costumer) {
        return response.status(400).json("User not found.");
    }
    request.costumer = costumer;
    return next();
};

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const existUser = costumers.some((costumer) => costumer.cpf === cpf);
    if (existUser) {
        return response.status(400).json("The user with cpf " + cpf + " already exists.")
    }

    costumers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    })
    return response.status(200).json('New costumer ' + name + ' successfully created')

});

app.get("/statement", cpfAccountExists, (request, response) => {
    const { costumer } = request;
    return response.json(costumer.statement)

})

app.post("/deposit", cpfAccountExists, (request, response) => {
    const { costumer } = request;
    const { description, amount } = request.body;

    const depositOp = {
        description,
        amount,
        date: new Date(),
        type: "credit"
    };
    costumer.statement.push(depositOp);

    console.log("The user " + costumer.name + " made a deposit of R$" + amount + " into the account.")
    return response.status(200).json(depositOp);

})

app.post("/withdraw", cpfAccountExists, (request, response) => {
    const { costumer } = request;
    const { amount } = request.body;
    const balanceAtual = balance(costumer);
    const withdrawOp = {
        amount,
        date: new Date(),
        type: "debit"
    };
    if (balanceAtual < amount) {
        console.log(balanceAtual);
        return response.status(400).json('Insufficient balance.');

    } else {

        costumer.statement.push(withdrawOp);
        console.log(balanceAtual - amount);
        return response.status(200).json(withdrawOp);

    }

})

app.get("/statement/date", cpfAccountExists, (request, response) => {
    const { costumer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const dayStatement = costumer.statement.filter((statement) => statement.date.toDateString() === new Date(dateFormat).toDateString());
    return response.json(dayStatement);
})

app.put("/account/edit", cpfAccountExists, (request, response) => {
    const { costumer } = request;
    const { name } = request.body;

    costumer.name = name;

    return response.json("Conta atualizada com sucesso.")
})

app.get("/account", cpfAccountExists, (request, response) => {
    const { costumer } = request;
    return response.json(costumer);
})

app.delete("/account", cpfAccountExists, (request, response) => {
    const { costumer } = request;
    costumers.splice(costumer, 1);
    return response.json("A conta do usúario " + costumer.name + " foi deletada com sucesso.")
})

app.get("/account/balance", cpfAccountExists, (request, response) => {
    const { costumer } = request;
    return response.json("O balance total da conta é: " + balance(costumer));
})
function balance(costumer) {
    return costumer.statement.reduce((acc, statement) => {

        if (statement.type === "debit") {
            return acc - statement.amount;
        };
        if (statement.type === "credit") {
            return acc + statement.amount;
        };


    }, 0);

};