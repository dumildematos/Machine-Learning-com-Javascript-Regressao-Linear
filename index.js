
//Carregar biblioteca 
const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // SLR - Simple Linear Regression (Regressão Linear Simples)

const csvFilePath = 'advertising.csv'; // Arquivo dos dados

let csvData = [], // Parse Data
	x = []; // Input
	y = []; // Ouput

let regressionModel;

//Carregar dados do arquico Advertising.csv

csv()
	.fromFile(csvFilePath)
	.on('json', (jsonObject)=>{
		csvData.push(jsonObject);
	})
	.on('done', () => {
		dressData(); // Para obter os indices do objeto no Json
		performRegression();
	});

function dressData(){
	/*
       Uma linha do objeto de dados se parece com:
      	{
       		TV: "10",
       		Radio: "100",
       		Newspaper: "20",
       		"Sales": "1000"
      	}
      
       Assim, ao adicionar os pontos de dados,
       precisamos analisar o valor String como um Float.
      */
	csvData.forEach((row) => {
		x.push(f(row.Radio));
		y.push(f(row.Sales));
	});
}

function f(s){
	return parseFloat(s);
}

//treinar o modelo e começar a prever
function performRegression(){
	regressionModel = new SLR(x,y);
	console.log(regressionModel.toString(3));
	predictOutput();
}

function predictOutput(){
	rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer)=>{
		console.log(`At X = ${answer}, y = ${regressionModel.predict(parseFloat(answer))}`);
		predictOutput();
	});
}

const readline = require('readline'); // para o prompt do user aceitar previsões

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});