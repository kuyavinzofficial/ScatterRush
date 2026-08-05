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
let freeSpins = 0;
let currentResult = [];
let spinning = false;


// ELEMENTS

const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
    document.getElementById("reel4"),
    document.getElementById("reel5")
];

const balanceText = document.getElementById("balance");
const winText = document.getElementById("win");
const freeSpinText = document.getElementById("freeSpins");
const message = document.getElementById("message");
const spinButton = document.getElementById("spinButton");


// SOUNDS

const spinSound = new Audio("./assets/sounds/spin.mp3");
const stopSound = new Audio("./assets/sounds/stop.mp3");
const winSound = new Audio("./assets/sounds/win.mp3");
const bigWinSound = new Audio("./assets/sounds/bigwin.mp3");
const freeSpinSound = new Audio("./assets/sounds/freespin.mp3");


spinSound.volume = 0.5;
stopSound.volume = 0.5;
winSound.volume = 0.5;
bigWinSound.volume = 0.5;
freeSpinSound.volume = 0.5;

function playSound(sound){

    if(!sound) return;

    sound.pause();
    sound.currentTime = 0;

    sound.play()
    .then(()=>{
        console.log("Playing sound");
    })
    .catch((error)=>{
        console.log("Audio blocked:", error);
    });

}
spinSound.addEventListener("canplaythrough", ()=>{
    console.log("spin.mp3 loaded");
});

stopSound.addEventListener("canplaythrough", ()=>{
    console.log("stop.mp3 loaded");
});

winSound.addEventListener("canplaythrough", ()=>{
    console.log("win.mp3 loaded");
});

// RANDOM SYMBOL

function randomSymbol(){

    let pool = [

        "ivana.png",
        "ivana.png",
        "ivana.png",

        "hapon.png",
        "hapon.png",
        "hapon.png",

        "moon.png",
        "moon.png",

        "clover.png",
        "clover.png",

        "bell.png",

        "parol.png",

        "crown.png",

        "wild.png",

        "feheng.png"

    ];


    return pool[Math.floor(Math.random()*pool.length)];

}



// SPIN FUNCTION

function spin(){


    if(spinning) return;


    let freeMode = freeSpins > 0;


    if(!freeMode){


        if(balance < bet){

            message.innerHTML="NO BALANCE";

            return;

        }


        balance -= bet;

        balanceText.innerHTML = balance;


    }
    else{


        freeSpins--;

        freeSpinText.innerHTML = freeSpins;


    }



    spinning = true;

    currentResult = [];

    winText.innerHTML = 0;

    message.innerHTML = "SPINNING...";


    playSound(spinSound);



    reels.forEach((reel,index)=>{


        let animation = setInterval(()=>{


            reel.innerHTML="";


            for(let i=0;i<3;i++){


                let img=document.createElement("img");

                img.src=imagePath + randomSymbol();

                reel.appendChild(img);


            }


        },80);



        setTimeout(()=>{


            clearInterval(animation);


            reel.innerHTML="";


            let finalColumn=[];



            for(let row=0;row<3;row++){


                let symbol=randomSymbol();


                finalColumn.push(symbol);



                let img=document.createElement("img");

                img.src=imagePath + symbol;

                reel.appendChild(img);


            }



            currentResult[index]=finalColumn;


            playSound(stopSound);



            if(index===4){


                spinning=false;


                checkScatter();

                checkWins();


            }



        },1200 + (index * 500));



    });



}



// SCATTER CHECK

function checkScatter(){


    let count = 0;


    currentResult.forEach(reel=>{


        reel.forEach(symbol=>{


            if(symbol==="feheng.png"){

                count++;

            }


        });


    });



    if(count>=3){


        playSound(freeSpinSound);


        let bonus;


        if(count===3){

            bonus=8;

        }
        else if(count===4){

            bonus=15;

        }
        else{

            bonus=30;

        }



        freeSpins += bonus;


        freeSpinText.innerHTML = freeSpins;


        message.innerHTML="🎉 FREE SPINS +" + bonus;


    }



}



// WIN CHECK

function checkWins(){


    let totalWin = 0;


    let allSymbols=[

        "ivana.png",
        "hapon.png",
        "moon.png",
        "clover.png",
        "bell.png",
        "parol.png",
        "crown.png"

    ];



    allSymbols.forEach(symbol=>{


        let reelsMatched=0;

        let lastReel=-1;



        for(let col=0;col<currentResult.length;col++){


            let found=false;



            for(let row=0;row<3;row++){


                let item=currentResult[col][row];


                if(item===symbol || item==="wild.png"){

                    found=true;

                    break;

                }


            }



            if(found){

                reelsMatched++;

                lastReel=col;


            }
            else{

                break;

            }


        }



        if(reelsMatched>=3){


            let win=0;


            if(reelsMatched===3){

                win=bet*2;

            }


            if(reelsMatched===4){

                win=bet*5;

            }


            if(reelsMatched===5){

                win=bet*15;

            }



            if(hasExtraNeighbor(symbol,lastReel)){


                win*=1.10;


            }



            totalWin+=Math.floor(win);



        }



    });



    if(totalWin>0){


        balance+=totalWin;


        balanceText.innerHTML=balance;

        winText.innerHTML=totalWin;


        message.innerHTML="🎉 WIN +" + totalWin;


        playSound(winSound);


    }



}



// EXTRA SYMBOL BONUS

function hasExtraNeighbor(symbol,lastReel){


    let next=lastReel+1;


    if(next>=currentResult.length){

        return false;

    }



    for(let row=0;row<3;row++){


        if(
            currentResult[next][row]===symbol ||
            currentResult[next][row]==="wild.png"
        ){

            return true;

        }


    }



    return false;


}



// BUTTON START

spinButton.addEventListener("click", spin);
