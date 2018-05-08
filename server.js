const express = require('express');
const path = require('path');
const body = require('body-parser');
const functionList = require('./awsLambda/listFunction.json');
const lambdaController = require('./C4/index.js');
const app = express();

lambdaController.configure('us-east-1','us-east-1:e9013370-61d4-42ae-af82-ede66d14f6db');
lambdaController.setFunctionList(functionList, "dev");
app.get('/getHtmlViz', lambdaController.getHtmlViz);


// console.log('Fucntion List: ', lambdaController.getHtmlViz)



app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.js'));
});

app.get('/secondPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'secondPage.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

lambdaController.createTagGroup("#HelloWorld", "TestFunction4", "TestFunction5");
lambdaController.createTagGroup("#HelloWorld1", "TestFunction6");
// lambdaController.warmupFunctions(0.1,"TestFunction6");
// lambdaController.warmupTagGroup(0.1, "#HelloWorld");

app.listen(3000, () => {
    console.log("Listening on PORT");
});