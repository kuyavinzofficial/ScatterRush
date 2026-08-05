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


// POPUPS
const bonusPopup = document.getElementById("bonusPopup");
const winPopup = document.getElementById("winPopup");

const winAmount = document.getElementById("winAmount");



// SOUNDS

const spinSound = new Audio(soundPath + "spin.mp3");
const stopSound = new Audio(soundPath + "stop.mp3");
const winSound = new Audio(soundPath + "win.mp3");
const scatterSound = new Audio(soundPath + "scatter.mp3");





function playSound(sound){

    if(!sound) return;

    sound.currentTime = 0;

    sound.play().catch(()=>{});

}





// SYMBOL RANDOM WITH WEIGHT

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


    currentResult=[];


    winText.innerHTML="0";


    message.innerHTML="SPINNING...";


    playSound(spinSound);



    spinReels();


}






function spinReels(){


    reels.forEach((reel,index)=>{


        let result=[];


        let timer=setInterval(()=>{


            reel.innerHTML="";


            for(let i=0;i<3;i++){


                let img=document.createElement("img");

                img.src=imagePath + randomSymbol();

                reel.appendChild(img);

            }


        },80);



        setTimeout(()=>{


            clearInterval(timer);


            reel.innerHTML="";


            for(let row=0;row<3;row++){


                let symbol=randomSymbol();


                result.push(symbol);



                let img=document.createElement("img");

                img.src=imagePath + symbol;

                reel.appendChild(img);


            }


            currentResult[index]=result;


            playSound(stopSound);



            if(index===4){


                spinning=false;


                checkScatter();

                checkWins();


            }



        },1200+(index*500));



    });
function checkScatter(){


    let scatterCount = 0;



    currentResult.forEach(reel=>{


        reel.forEach(symbol=>{


            if(symbol === "feheng.png"){

                scatterCount++;

            }


        });


    });



    if(scatterCount >= 3){


        playSound(scatterSound);



        let bonus = 0;


        if(scatterCount === 3){

            bonus = 8;

        }
        else if(scatterCount === 4){

            bonus = 15;

        }
        else if(scatterCount >= 5){

            bonus = 30;

        }



        freeSpins += bonus;


        freeSpinText.innerHTML = freeSpins;


        message.innerHTML = "🎉 FREE SPINS ACTIVATED!";



        showBonusPopup(bonus);



    }


}







function checkWins(){


    let totalWin = 0;



    for(let row = 0; row < 3; row++){


        let line=[];



        for(let reel=0; reel<5; reel++){


            line.push(currentResult[reel][row]);


        }



        totalWin += calculateLine(line);


    }





    if(totalWin > 0){


        balance += totalWin;


        balanceText.innerHTML = balance;


        winText.innerHTML = totalWin;



        message.innerHTML = "WIN +" + totalWin;



        playSound(winSound);



        if(totalWin >= bet * 10){

            showWinPopup(totalWin);

        }



    }



}







function calculateLine(line){


    let firstSymbol = null;

    let count = 0;


    for(let symbol of line){



        if(symbol === "feheng.png"){

            continue;

        }




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



    if(count === 3){


        return bet * 2;


    }



    if(count === 4){


        return bet * 5;


    }



    if(count >= 5){


        if(line.every(symbol=>symbol==="wild.png")){


            return bet * 50;


        }



        return bet * 15;


    }



    return 0;


}







function showBonusPopup(amount){


    if(!bonusPopup) return;


    bonusPopup.classList.add("show");


    let text=document.getElementById("bonusText");


    if(text){

        text.innerHTML = amount + " FREE SPINS";

    }



    setTimeout(()=>{


        bonusPopup.classList.remove("show");


    },3000);



}








function showWinPopup(amount){


    if(!winPopup) return;



    winPopup.classList.add("show");



    if(winAmount){

        winAmount.innerHTML="+" + amount;

    }




    setTimeout(()=>{


        winPopup.classList.remove("show");


    },3000);



}







spinButton.addEventListener("click", spin);

}
