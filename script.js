const symbols = [
    "symbol1.png",
    "symbol2.png",
    "symbol3.png",
    "symbol4.png",
    "symbol5.png",
    "symbol6.png",
    "symbol7.png",
    "symbol8.png",
    "symbol9.png",
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


    reels.forEach((reel,index)=>{


        reel.innerHTML="";

        let reelResult=[];


        for(let row=0; row<3; row++){

            let symbol=randomSymbol();

            reelResult.push(symbol);


            let img=document.createElement("img");

            img.src="symbols/"+symbol;

            reel.appendChild(img);

        }


        currentResult.push(reelResult);


    });



    checkWin();


}





function checkWin(){


    let totalWin=0;



    // LINE 1 - TOP ROW
    let line1=[];

    for(let i=0;i<5;i++){

        line1.push(currentResult[i][0]);

    }


    totalWin += calculateLine(line1);



    // LINE 2 - MIDDLE ROW
    let line2=[];

    for(let i=0;i<5;i++){

        line2.push(currentResult[i][1]);

    }


    totalWin += calculateLine(line2);




    // LINE 3 - BOTTOM ROW
    let line3=[];

    for(let i=0;i<5;i++){

        line3.push(currentResult[i][2]);

    }


    totalWin += calculateLine(line3);



    if(totalWin>0){

        balance += totalWin;

        winText.innerHTML=totalWin;

        balanceText.innerHTML=balance;

        message.innerHTML="🎉 WIN "+totalWin+"!";

    }
    else{

        message.innerHTML="Try Again!";

    }


}




function calculateLine(line){


    let first=line[0];

    let count=1;



    for(let i=1;i<line.length;i++){


        if(line[i]===first || line[i]==="wild.png"){

            count++;

        }
        else if(first==="wild.png"){

            first=line[i];
            count++;

        }
        else{

            break;

        }

    }



    if(count>=3){

        return count*bet;

    }


    return 0;


}




spinButton.addEventListener("click",spin);
