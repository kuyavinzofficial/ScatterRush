// =======================
// ScatterRush V2 Engine
// =======================

let coins = Number(localStorage.getItem("scatterCoins")) || 1000;
let xp = Number(localStorage.getItem("scatterXP")) || 0;
let level = Number(localStorage.getItem("scatterLevel")) || 1;

const symbols = [
    "assets/symbols/ivana.png",
    "assets/symbols/feheng.png",
    "assets/symbols/hapon.png"
];

const payouts = {
    "assets/symbols/ivana.png": 50,
    "assets/symbols/feheng.png": 100,
    "assets/symbols/hapon.png": 150
};

function updateUI(){

    document.getElementById("coins").textContent = coins;
    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;

}

function randomSymbol(){

    return symbols[
        Math.floor(Math.random()*symbols.length)
    ];

}

function spin(){

    if(coins < 10){

        document.getElementById("message").innerHTML =
        "❌ Not enough coins.";

        return;

    }

    coins -= 10;

    updateUI();

    document.getElementById("message").innerHTML =
    "🎰 Spinning...";

    let reel1 = document.getElementById("reel1");
    let reel2 = document.getElementById("reel2");
    let reel3 = document.getElementById("reel3");

    let spin1 = setInterval(()=>{
        reel1.src=randomSymbol();
    },80);

    let spin2 = setInterval(()=>{
        reel2.src=randomSymbol();
    },80);

    let spin3 = setInterval(()=>{
        reel3.src=randomSymbol();
    },80);

    let r1,r2,r3;

    setTimeout(()=>{

        clearInterval(spin1);

        r1=randomSymbol();

        reel1.src=r1;

    },1200);


    setTimeout(()=>{

        clearInterval(spin2);

        r2=randomSymbol();

        reel2.src=r2;

    },1800);


    setTimeout(()=>{

        clearInterval(spin3);

        r3=randomSymbol();

        reel3.src=r3;

        checkWin(r1,r2,r3);

    },2400);

}
    setTimeout(function(){

        clearInterval(interval);

        let r1 = randomSymbol();
        let r2 = randomSymbol();
        let r3 = randomSymbol();

        document.getElementById("reel1").src = r1;
        document.getElementById("reel2").src = r2;
        document.getElementById("reel3").src = r3;

        checkWin(r1,r2,r3);

    },1800);

    updateUI();

}

function checkWin(a,b,c){

    if(a===b && b===c){

        let reward = payouts[a];

        coins += reward;

        xp += 25;

        if(xp>=100){

            xp=0;

            level++;

        }

        document.getElementById("message").innerHTML =
        "🎉 YOU WIN +"+reward+" COINS!";

    }else{

        document.getElementById("message").innerHTML =
        "Try Again!";

    }

    saveGame();

    updateUI();

}

function dailyBonus(){

    coins += 100;

    document.getElementById("message").innerHTML =
    "🎁 Daily Bonus +100 Coins";

    saveGame();

    updateUI();

}

function openShop(){

    alert(
`SHOP

1000 Coins = ₱49

5000 Coins = ₱199

10000 Coins = ₱399

(Coming Soon)`
    );

}

function saveGame(){

    localStorage.setItem("scatterCoins",coins);
    localStorage.setItem("scatterXP",xp);
    localStorage.setItem("scatterLevel",level);

}

updateUI();
