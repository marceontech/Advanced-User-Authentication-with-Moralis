console.log('hello world');

// connect to Moralis server
Moralis.initialize("OVQv4GzkGYKOJmcd2UE0wF6AGh4Czz6Vlq6Sfzn8");
Moralis.serverURL = "https://krkxhau0hur3.usemoralis.com:2053/server";


let homepage = "http://127.0.0.1:5500/signin.html?"
if(Moralis.User.current() == null && window.location.href != homepage){
    document.querySelector('body').style.display = 'none';
    window.location.href = "signin.html";
}


login = async () => {
    let user = Moralis.User.current();
    if(!user) {
    user = await Moralis.authenticate();
    }
    console.log("Logged in user:", user);
    user.set("name", document.getElementById('user-name').value);
    user.set("email", document.getElementById('user-email').value);
    await user.save();
    window.location.href = "dashboard.html";
    }

    
logout =  async () => {
    await Moralis.User.logOut();
    window.location.href = "signin.html";
}


getTransactions = async () => {
    console.log('get transactions clicked');
    const options = { chain: "rinkeby", address: "0x937C0d69a5c3664B38A725E8Fc864756f4F49b4b" };
    const transactions = await Moralis.Web3API.account.getTransactions(options);
    console.log(transactions);

}
let transactions = "table"
if(transactions.total > 0) {
    let table = `
    <table class="table">
    <thead>
          <tr>
            <th> scope="col">Transactions</th>
            <th> scope="col">lock Number</th>
            <th> scope="col">Age</th>
            <th> scope="col">Type</th>
            <th> scope="col">Fee</th>
            <th> scope="col">Value</th>
          </tr>
    </thead>
    <body id="theTransactions">
    </body>
    </table>
    `
}

document.querySelector('#tableOfTransactions').innerHTML = table;

transactions.result.forEach(t => {
    let content = 
    <tr>
        <td> ${t.hash}</td>
        <td> ${t.block_number}</td>
        <td> ${t.block_timestamp}</td>
        <td> ${t.from_address}</td>
        <td> ${(t.gas * t.gas_price) / 1e18.toFixed(5)} ETH</td>
        <td> ${t.value / 1e18}</td>
        </tr>
     
     theTransactions.innerHTML += content;
});

if(document.querySelector('#btn-login') != null){ 
document.querySelector('#btn-login').onclick = login;
}
if(document.querySelector('#btn-logout') != null){ 
document.querySelector('#btn-logout').onclick = logout;
}
if(document.querySelector('#get-transactions-link') != null){ 
    document.querySelector('#get-transactions-link').onclick = getTransactions;
    }

//get-transactions-link
//get-balance-link
//get-nfts-link