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
const soundPath = "./assets/sounds/";

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


// SOUNDS
const spinSound = new Audio(soundPath + "spin.mp3");
const stopSound = new Audio(soundPath + "stop.mp3");
const winSound = new Audio(soundPath + "win.mp3");
const scatterSound = new Audio(soundPath + "scatter.mp3");



function randomSymbol(){
    return symbols[Math.floor(Math.random() * symbols.length)];
}




function playSound(sound){

    sound.currentTime = 0;
    sound.play().catch(()=>{});

}




function spin(){

    if(balance < bet){
        message.innerHTML = "NO BALANCE";
        return;
    }


    balance -= bet;
    balanceText.innerHTML = balance;
    winText.innerHTML = 0;
    message.innerHTML = "SPINNING...";


    currentResult = [];


    playSound(spinSound);



    reels.forEach((reel,index)=>{


        reel.innerHTML = "";


        let column = [];


        // temporary spinning symbols

        let spinInterval = setInterval(()=>{

            reel.innerHTML="";


            for(let i=0;i<3;i++){

                let temp = randomSymbol();

                let img=document.createElement("img");

                img.src=imagePath + temp;

                reel.appendChild(img);

            }


        },80);



        // final stop

        setTimeout(()=>{


            clearInterval(spinInterval);


            reel.innerHTML="";


            for(let row=0;row<3;row++){

                let finalSymbol=randomSymbol();

                column.push(finalSymbol);


                let img=document.createElement("img");

                img.src=imagePath + finalSymbol;

                reel.appendChild(img);

            }


            currentResult[index]=column;


            playSound(stopSound);



            // check result after last reel

            if(index===4){

                checkLines();

            }


        },1200 + (index * 500));



    });


}





function checkLines(){


    let totalWin=0;


    let lines=[
        0,
        1,
        2
    ];



    lines.forEach(row=>{


        let line=[];


        for(let reel=0; reel<5; reel++){

            line.push(currentResult[reel][row]);

        }


        totalWin += checkCombination(line);


    });



    if(totalWin>0){


        balance += totalWin;

        balanceText.innerHTML=balance;

        winText.innerHTML=totalWin;

        message.innerHTML="🎉 WIN "+totalWin;


        playSound(winSound);


    }
    else{

        message.innerHTML="TRY AGAIN";

    }



}




function checkCombination(line){


    let first=null;
    let count=0;


    for(let symbol of line){


        if(symbol==="wild.png"){

            count++;
            continue;

        }


        if(first===null){

            first=symbol;
            count++;

        }
        else if(symbol===first){

            count++;

        }
        else{

            break;

        }

    }



    if(count>=3){

        return count * bet;

    }


    return 0;

}




spinButton.addEventListener("click",spin);
