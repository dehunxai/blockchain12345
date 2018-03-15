const express = require('express');
const bodyParser = require('body-parser');
const BrewNode = require('./brewNode'); 

const port = 8080;
console.log('starting node on ', port)
let node1 = new BrewNode(port);

node1.init();

const http_port = 8081;


let BrewHTTP = function (){
	const app = new express();

	app.use(bodyParser.json());

	app.get('/addNode', (req, res)=>{
		let ip = req.query.ip;
		let nodeport = req.query.port;
		console.log('add host: '+ip+":"+nodeport)
		node1.addPeer(ip, nodeport)
		res.send('add host: '+ip+":"+nodeport);
	})

	app.get('/addBlock', (req, res)=>{
		let temp = req.query.temp;
		let pressure = req.query.pressure;
		let volume = req.query.volume;
		console.log('temp '+temp);
		if(temp<=100 && temp>=5){
			let newBlock = node1.createBlock(temp,pressure,volume);
			console.log('block created ');
			res.send("Block Created");	
		}else{
			res.send("Invalid temperature");
		}
	})
	
	app.get('/getLatestBlock', (req, res)=>{
		
		let latest = node1.getLatestBlock(); 
		res.send('Latest: '+latest);
	})

	app.get('/getChainInfo', (req, res)=>{
		
		let info = node1.getChainInfo(); 
		res.send('Block Chain Info: '+info);
	})
	
	app.listen(http_port, () => {
		console.log(`http server up.. ${http_port}`);
	})
}

let httpserver = new BrewHTTP();

