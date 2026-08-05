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


let balance = 1000;
let bet = 10;

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


let currentResult = [];



function randomSymbol(){

    let random = Math.floor(Math.random() * symbols.length);

    return symbols[random];

}




function spin(){

    if(balance < bet){

        message.innerHTML = "Not enough balance!";
        return;

    }


    balance -= bet;

    balanceText.innerHTML = balance;

    winText.innerHTML = 0;


    currentResult = [];


    reels.forEach((reel)=>{


        reel.innerHTML="";

        let reelResult=[];


        for(let row=0; row<3; row++){

            let symbol=randomSymbol();

            reelResult.push(symbol);


            let img=document.createElement("img");

            img.src="symbols/" + symbol;

            img.alt=symbol;

            reel.appendChild(img);

        }


        currentResult.push(reelResult);


    });



    checkWin();


}




function checkWin(){


    let totalWin=0;


    // LINE 1 - TOP
    let line1=[];

    for(let i=0;i<5;i++){

        line1.push(currentResult[i][0]);

    }

    totalWin += calculateLine(line1);



    // LINE 2 - MIDDLE
    let line2=[];

    for(let i=0;i<5;i++){

        line2.push(currentResult[i][1]);

    }

    totalWin += calculateLine(line2);



    // LINE 3 - BOTTOM
    let line3=[];

    for(let i=0;i<5;i++){

        line3.push(currentResult[i][2]);

    }

    totalWin += calculateLine(line3);



    if(totalWin > 0){

        balance += totalWin;

        balanceText.innerHTML = balance;

        winText.innerHTML = totalWin;

        message.innerHTML = "🎉 WIN " + totalWin + "!";

    }
    else{

        message.innerHTML = "TRY AGAIN";

    }


}




function calculateLine(line){


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
