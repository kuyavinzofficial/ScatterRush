const symbols = [
    "ivana.png",
    "hapon.png",
    "feheng.png",
    "moon.png",
    "clover.png",
    "bell.png",
    "parol.png",
    "crown.png",
    "wild.png"
];

const imagePath = "./assets/symbols/";

let balance = 1000;
let bet = 10;

let currentResult = [];


const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
    document.getElementById("reel4"),
    document.getElementById("reel5")
];


const balanceText = document.getElementById("balance");
const winText = document.getElementById("win");
const message = document.getElementById("message");
const spinButton = document.getElementById("spinButton");



function randomSymbol(){

    let random = Math.floor(Math.random() * symbols.length);

    return symbols[random];

}



function spin(){

    if(balance < bet){

        message.innerHTML = "NO BALANCE";
        return;

    }


    balance -= bet;

    balanceText.innerHTML = balance;

    winText.innerHTML = 0;

    currentResult = [];



    reels.forEach((reel)=>{

        reel.innerHTML = "";

        let column = [];


        for(let row = 0; row < 3; row++){

            let symbol = randomSymbol();

            column.push(symbol);


            let img = document.createElement("img");

            img.src = imagePath + symbol;

            img.width = 55;
            img.height = 55;

            reel.appendChild(img);

        }


        currentResult.push(column);


    });



    checkLines();

}




function checkLines(){

    let totalWin = 0;


    // TOP LINE
    let top = [];

    for(let i=0;i<5;i++){
        top.push(currentResult[i][0]);
    }


    totalWin += checkCombination(top);



    // MIDDLE LINE
    let middle = [];

    for(let i=0;i<5;i++){
        middle.push(currentResult[i][1]);
    }


    totalWin += checkCombination(middle);



    // BOTTOM LINE
    let bottom = [];

    for(let i=0;i<5;i++){
        bottom.push(currentResult[i][2]);
    }


    totalWin += checkCombination(bottom);



    if(totalWin > 0){

        balance += totalWin;

        balanceText.innerHTML = balance;

        winText.innerHTML = totalWin;

        message.innerHTML = "🎉 WIN " + totalWin;


    }else{

        message.innerHTML = "TRY AGAIN";

    }


}




function checkCombination(line){

    let firstSymbol = null;
    let count = 0;


    for(let symbol of line){


        if(symbol === "wild.png"){

            count++;
            continue;

        }


        if(firstSymbol === null){

            firstSymbol = symbol;
            count++;

        }
        else if(symbol === firstSymbol){

            count++;

        }
        else{

            break;

        }

    }



    if(count >= 3){

        return count * bet;

    }


    return 0;

}




spinButton.addEventListener("click", spin);
