// =======================
// ScatterRush V3 Engine
// =======================

let coins = Number(localStorage.getItem("scatterCoins")) || 1000;
let xp = Number(localStorage.getItem("scatterXP")) || 0;
let level = Number(localStorage.getItem("scatterLevel")) || 1;

let spinning = false;

const symbols = [
    "assets/symbols/ivana.png",
    "assets/symbols/feheng.png",
    "assets/symbols/hapon.png"
];

// Chance ng bawat symbol
function randomSymbol(){

    const chance = Math.random();

    if(chance < 0.45){
        return symbols[0]; // ivana
    }

    if(chance < 0.80){
        return symbols[1]; // feheng
    }

    return symbols[2]; // hapon

}

const payouts = {
    "assets/symbols/ivana.png":30,
    "assets/symbols/feheng.png":80,
    "assets/symbols/hapon.png":200
};

function updateUI(){

    document.getElementById("coins").textContent = coins;
    document.getElementById("xp").textContent = xp;
    document.getElementById("level").textContent = level;

}

function spin(){

    if(spinning) return;

    if(coins < 10){

        document.getElementById("message").innerHTML =
        "❌ Not enough Coins";

        return;

    }

    spinning = true;

    coins -= 10;

    updateUI();

    document.getElementById("message").innerHTML =
    "🎰 Spinning...";

    const reel1 = document.getElementById("reel1");
    const reel2 = document.getElementById("reel2");
    const reel3 = document.getElementById("reel3");

    const spin1 = setInterval(()=>{
        reel1.src=randomSymbol();
    },80);

    const spin2 = setInterval(()=>{
        reel2.src=randomSymbol();
    },80);

    const spin3 = setInterval(()=>{
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

        spinning=false;

    },2400);

}

function checkWin(a,b,c){

    if(a===b && b===c){

        let reward=payouts[a];

        coins+=reward;

        xp+=25;

        if(xp>=100){

            xp=0;

            level++;

        }

        document.getElementById("message").innerHTML =
        "🎉 YOU WIN! +" + reward + " Coins";

        document.querySelectorAll(".reel").forEach(r=>{
            r.classList.add("win");
        });

        setTimeout(()=>{

            document.querySelectorAll(".reel").forEach(r=>{
                r.classList.remove("win");
            });

        },1500);

    }else{

        document.getElementById("message").innerHTML =
        "😢 Try Again";

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

    alert(`🛒 SHOP

1000 Coins = ₱49

5000 Coins = ₱199

10000 Coins = ₱399

Coming Soon`);

}

function saveGame(){

    localStorage.setItem("scatterCoins",coins);
    localStorage.setItem("scatterXP",xp);
    localStorage.setItem("scatterLevel",level);

}

updateUI();
