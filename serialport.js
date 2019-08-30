const SerialPort = require('serialport');
const _ = require('lodash');
const puppeteer = require('puppeteer');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM4');
const parser = new Readline();
port.pipe(parser);
parser.on('data', onMessage);

let controller;
let prev;
let page;


(async () => {
	let browser = await puppeteer.launch({headless: false, defaultViewport: null});
	page = await browser.newPage();	
	await page.goto('http://localhost:3003/');		
})()
.catch(err => console.error(err));

function getAllIndexes(arr) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === 1)
            indexes.push(i);
    return indexes;
}

function getChange(con1, con2){
	let ret = {};
	
	ret.contr1 = getAllIndexes(con1);
	ret.contr2 = getAllIndexes(con2);

	if(ret.contr1.length > 0 || ret.contr2.length > 0){		
		return ret;
	}
	else {
		return ""
	}
	
}

var even = function(element) {
  return element % 2 === 0;
};

function onMessage(data){
	try{
		controller = JSON.parse(data).controller;

		if(prev){
		
		var eq = _.isEqual(controller, prev)
		if(!eq){
			let con = getChange(controller[0],controller[1])

			 if(con != "")
				
				if(typeof page === 'object' && page !== null) {
					if(typeof page.evaluate === 'function') {
						

						console.log(con)
						console.log(prev)
						if(con.contr1.length > 0){
						if(con.contr1.some(x => x === 0) && prev[0][0]!= 1){
							page.keyboard.press('a').catch(err=> console.log(err));
						}
						if(con.contr1.some(x => x === 1) && prev[0][1]!= 1){
							page.keyboard.press('b').catch(err=> console.log(err));
						}
						if(con.contr1.some(x => x === 2) && prev[0][2]!= 1){
							page.keyboard.press('c').catch(err=> console.log(err));
						}
						if(con.contr1.some(x => x === 3) && prev[0][3]!= 1){
							page.keyboard.press('d').catch(err=> console.log(err));
						}
						}
						if(con.contr2.length > 0){
						if(con.contr2.some(x => x === 0) && prev[1][0]!= 1){
							page.keyboard.press('1').catch(err=> console.log(err));
						}
						if(con.contr2.some(x => x === 1) && prev[1][1]!= 1){
							page.keyboard.press('2').catch(err=> console.log(err));
						}
						if(con.contr2.some(x => x === 2) && prev[1][2]!= 1){
							page.keyboard.press('3').catch(err=> console.log(err));
						}
						if(con.contr2.some(x => x === 3) && prev[1][3]!= 1){
							page.keyboard.press('4').catch(err=> console.log(err));
						}	
						}						
					}
				}			
			}		
		}
		prev = controller;
	}
	catch(e){
		console.log(e)
	}
	
	prev = controller;
}

/*

function start(){
	port.write('a', (err) => {
		if (err) {
			return console.log('Error on write: ', err.message);
		}
		port.pipe(parser);
		parser.on('data', onMessage);
		console.log('message written');
	});
}
 
function stop(){
	port.write('b', (err) => {
		if (err) {
			return console.log('Error on write: ', err.message);
		}
		SerialPort.close();
		console.log('message written');
	});
}
start()
*/