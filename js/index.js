var CONTRACT_ADDRESS = '';

var referrer = '0x9A22b45338CB8764C4D5384A3C8c25411355EF45'
var upline = '0x9A22b45338CB8764C4D5384A3C8c25411355EF45'


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var refurl = getUrlParameter('ref');

if(refurl){
    localStorage.setItem('ref', refurl);
}

upline = localStorage.getItem('ref') ?   localStorage.getItem('ref') : referrer;

var ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"_marketing","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_team","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_web","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"buyFarmers","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"},{"internalType":"uint256","name":"contractBalance","type":"uint256"}],"name":"calculateWorkBuy","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"eth","type":"uint256"}],"name":"calculateWorkBuySimple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"farmers","type":"uint256"}],"name":"calculateWorkSell","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"farmRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getFarmersSinceLastHarvest","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyFarmers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"adr","type":"address"}],"name":"getMyMiners","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"harvestFarmers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"openFarm","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sellFarmers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

var tokenContract;

var currentAddr;
var contract = null;
var gasPrice = '205000000000' //205000000000 FTM GAS
var percent1,percent2,percent3,percent4,percent5,percent6;
var startD, startH, startM, startS;

var BUSDPrice = 0;
var TokenPrice = 0;

var affiliate = 0;



window.addEventListener('load', Connect)

async function Connect() {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
            await ethereum.enable()

            let accounts = await web3.eth.getAccounts()
            currentAddr = accounts[0]
			console.log(currentAddr)
			runAPP()
            return
        } catch (error) {
            console.error(error)
        }

        
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider)

        let accounts = await web3.eth.getAccounts()
        currentAddr = accounts[0]
        console.log(currentAddr)
        runAPP()
        return
    }
    //setTimeout(checkForFantom, 1500)
}
async function checkForFantom() {
    try {
        await window.Fantom.enable()
        console.log(typeof(window.Fantom))
        if (window.Fantom) {
            console.log('Fantom')
            await Fantom.enable()
            window.web3 = new Web3(window.Fantom)
            let accounts = await web3.eth.getAccounts()
            currentAddr = accounts[0]
            
            console.log(contract)
            runAPP()
            return
        }
    } catch (e) {}
}  

async function runAPP(){
    let networkID = await web3.eth.net.getId()
    if (networkID == 250)
		contract = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS)
		console.log(contract)
    } 


    setInterval(() => {				
        if(contract){
			$("#refString").val('https://' + window.location.host  + '/?ref=' + currentAddr)
			
        } 
    }, 3000);
        
    setInterval(() => {
        if(contract){
            web3.eth.getAccounts().then(res=>{
                currentAddr = res[0]
            })
    
            var connectedAddr = currentAddr[0] + 
                                currentAddr[1] + 
                                currentAddr[2] + 
                                currentAddr[3] + 
                                currentAddr[4] + '...' +
                                currentAddr[currentAddr.length-5] + 
                                currentAddr[currentAddr.length-4] + 
                                currentAddr[currentAddr.length-3] + 
                                currentAddr[currentAddr.length-2] + 
                                currentAddr[currentAddr.length-1]

            $("#connect-btn1").text(connectedAddr)

            getContractBalance();
            web3.eth.getBalance(currentAddr).then(bal => {
                bal = web3.utils.fromWei(bal);
                bal = (Math.round(bal * 100) / 100).toFixed(2);
                $("#walletBalance").text(bal + " FTM")
            })
            getFishermen(currentAddr)
            getRewards(currentAddr)
		}
        
    }, 3000);



function approve() {
	tokenContract.methods.approve(CONTRACT_ADDRESS, web3.utils.toWei("1")).send({ from: currentAddr });
}

function stakeFTM() {
if (contract) {
	var amount = document.getElementById("app__inputftm").value;
    amount = web3.utils.toWei(String(amount), 'ether')

	contract.methods.buyFarmers(upline/*, (trxspenddoc.value*1e9)*/)
		.send({
						value: amount,
						from: currentAddr,
						gasPrice: gasPrice,
					})
			
	}
}

function sellFarmers() {
if (contract) {
	contract.methods.sellFarmers()
		.send({
						// value: amount,
						from: currentAddr,
						gasPrice: gasPrice,
					})
			
	}
}

function compound() {
if (contract) {
	contract.methods.harvestFarmers(upline)
		.send({
						// value: amount,
						from: currentAddr,
						gasPrice: gasPrice,
					})
			
	}
}

function getContractBalance() {
	contract.methods.getBalance().call().then(res=>{
        res = web3.utils.fromWei(res);
        res = (Math.round(res * 100) / 100).toFixed(2);
        $("#contractBalance").text(res + "FTM");
        console.log(res);
    })

}

function getFishermen(currentAddr) {
    contract.methods.getMyMiners(currentAddr).call().then(res=>{
        res = (Math.round(res * 100) / 100).toFixed(2);
        $("#frmrs").text(res + "Farmers");
        console.log(res);
    })
}

function getRewards(currentAddr) {
    contract.methods.farmRewards(currentAddr).call().then(res=>{
        res = web3.utils.fromWei(res);
        res = (Math.abs(res * 100) / 100).toFixed(4);
        $("#yourRewards").text(res + " FTM");
        console.log(res);
    })
}


function calcuate(number)
{
	console.log(number);
	 if (number && number >= 0) 
		contract.methods.calculatePrinterBuySimple((number*1e7 ).toString()).call().then(res=>{
		console.log((res/1e7))	;
		})
																						   
}

function spendLimit(callback) {
	tokenContract.methods.allowance(currentAddr,contract).call().then(result => {
			callback(web3.utils.fromWei(result));
		}).catch((err) => {
			console.log(err)
		});
	}

function calculateprinter(anzahl) {
	tokenContract.methods.allowance(currentAddr,contract).call().then(result => {
			callback(web3.utils.fromWei(result));
		}).catch((err) => {
			console.log(err)
		});
	}

function userBalance(callback){
	tokenContract.methods.balanceOf(currentAddr).call().then(result => {
				var amt = web3.utils.fromWei(result)
				// console.log("balance" + amt)
		callback(amt);
				usrBal=amt;
	}).catch((err) => {
		console.log(err)
	});
}
	

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
    showAlert('Successfuly copied','success')
}

/*$.getJSON( "https://api.pancakeswap.info/api/v2/tokens/0xc8AE7ded8b33ea0Da0d7c7FC6FEd35e3C1822be0", function( data ) {
   $("#tpg-price").text((data["data"]["price"]*100).toFixed(3));
	console.log(data["data"]["price"]);
});*/
