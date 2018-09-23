var proxyURL = 'https://cors-anywhere.herokuapp.com';
var xrpUrl = 'https://api.kraken.com/0/public/Ticker?pair=XRPEUR';
var btcUrl = 'https://api.kraken.com/0/public/Ticker?pair=BTCEUR';
var bthUrl = 'https://api.kraken.com/0/public/Ticker?pair=BCHEUR';
var ethUrl = 'https://api.kraken.com/0/public/Ticker?pair=ETHEUR';
var xmrUrl = 'https://api.kraken.com/0/public/Ticker?pair=XMREUR';
var eosUrl = 'https://api.kraken.com/0/public/Ticker?pair=EOSEUR';
var ltcUrl = 'https://api.kraken.com/0/public/Ticker?pair=LTCEUR';
var xlmUrl = 'https://api.kraken.com/0/public/Ticker?pair=XLMEUR';
var etcUrl = 'https://api.kraken.com/0/public/Ticker?pair=ETCEUR';
var zecUrl = 'https://api.kraken.com/0/public/Ticker?pair=ZECEUR';
var gnoUrl = 'https://api.kraken.com/0/public/Ticker?pair=GNOEUR';
var dshUrl = 'https://api.kraken.com/0/public/Ticker?pair=DASHEUR';
var repUrl = 'https://api.kraken.com/0/public/Ticker?pair=REPEUR';
var i = 1;

var table = document.querySelector(".table");


function generateCoin(coinName, data) {
    var coinKey = (Object.getOwnPropertyNames(data))[0];
    var row = table.insertRow(i);
    (data[coinKey]['c'][0]/data[coinKey]['l'][1]) > 1.10 ? row.className = "table-success" :  row.className = "";
    var _num = row.insertCell(0);
    var _coinName = row.insertCell(1);
    var _lastValue = row.insertCell(2);
    var _highValue = row.insertCell(3);
    var _lowValue = row.insertCell(4);
    var _coeffValue = row.insertCell(5);

    _num.innerHTML = `<strong>${i}</strong>`;
    _coinName.innerHTML = `<p><img src="img/${coinName}.png" alt="" style="vertical-align:middle;" /> ${coinName}</p>`;
    _lastValue.innerHTML = "&#8364;" + data[coinKey]['c'][0]; 
    _highValue.innerHTML = "&#8364; " + data[coinKey]['h'][1];
    _lowValue.innerHTML = "&#8364; " + data[coinKey]['l'][1];
    _coeffValue.innerHTML = data[coinKey]['c'][0]/data[coinKey]['l'][1];
    i++;
 }

function fetchAPIData(coinName, coinUrl, callback) {
    var xmr;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            xmr = JSON.parse(this.responseText);
            callback(coinName, xmr.result);
       }
    };
    xhttp.open("GET", proxyURL + "/" + coinUrl, true);
    xhttp.send(); 

}

function loadAll() {
    fetchAPIData("Ripple", xrpUrl, generateCoin);
    fetchAPIData("Ethereum", ethUrl, generateCoin);
    fetchAPIData("Bitcoin", btcUrl, generateCoin);
    fetchAPIData("Bitcoin Cash", bthUrl, generateCoin);
    fetchAPIData("EOS", eosUrl, generateCoin);
    fetchAPIData("Monero", xmrUrl, generateCoin);
    fetchAPIData("Litecoin", ltcUrl, generateCoin);
    fetchAPIData("Stellar", xlmUrl, generateCoin);
    fetchAPIData("Ethereum Classic", etcUrl, generateCoin);
    fetchAPIData("ZCash", zecUrl, generateCoin);
    fetchAPIData("Gnosis", gnoUrl, generateCoin);
    fetchAPIData("Dash", dshUrl, generateCoin);
    fetchAPIData("Augur", repUrl, generateCoin);
};

loadAll();
