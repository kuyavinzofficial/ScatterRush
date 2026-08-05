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

let freeSpins = 0;


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
const spinSound = new Audio(soundPath + "spin.mp3");
const stopSound = new Audio(soundPath + "stop.mp3");
const winSound = new Audio(soundPath + "win.mp3");
const scatterSound = new Audio(soundPath + "scatter.mp3");




function randomSymbol(){

    const weightedSymbols = [
        "ivana.png",
        "ivana.png",
        "ivana.png",
        "ivana.png",

        "hapon.png",
        "hapon.png",
        "hapon.png",
        "hapon.png",

        "moon.png",
        "moon.png",
        "moon.png",
        "moon.png",

        "clover.png",
        "clover.png",
        "clover.png",

        "bell.png",
        "bell.png",
        "bell.png",

        "parol.png",
        "parol.png",

        "crown.png",

        "wild.png",

        "feheng.png"
    ];


    return weightedSymbols[
        Math.floor(Math.random()*weightedSymbols.length)
    ];

}



function playSound(sound){

    sound.currentTime = 0;

    sound.play().catch(()=>{});

}




function spin(){


    let isFreeSpin = freeSpins > 0;



    if(!isFreeSpin){


        if(balance < bet){

            message.innerHTML="NO BALANCE";

            return;

        }


        balance -= bet;

        balanceText.innerHTML=balance;


    }
    else{

        freeSpins--;

        freeSpinText.innerHTML=freeSpins;

    }



    winText.innerHTML=0;

    message.innerHTML="SPINNING...";


    currentResult=[];


    playSound(spinSound);



    reels.forEach((reel,index)=>{


        reel.innerHTML="";


        let column=[];


        let animation=setInterval(()=>{


            reel.innerHTML="";


            for(let i=0;i<3;i++){


                let img=document.createElement("img");

                img.src=imagePath+randomSymbol();

                reel.appendChild(img);


            }


        },80);




        setTimeout(()=>{


            clearInterval(animation);


            reel.innerHTML="";



            for(let row=0;row<3;row++){


                let symbol=randomSymbol();


                column.push(symbol);



                let img=document.createElement("img");

                img.src=imagePath+symbol;

                reel.appendChild(img);


            }



            currentResult[index]=column;



            playSound(stopSound);



            if(index===4){


                checkScatter();


                checkLines();


            }



        },1200+(index*500));



    });



}




function checkScatter(){


    let scatterCount=0;



    for(let reel of currentResult){


        for(let symbol of reel){


            if(symbol==="feheng.png"){

                scatterCount++;

            }


        }


    }



    if(scatterCount>=3){


        playSound(scatterSound);



        if(scatterCount===3){

            freeSpins+=10;

        }
        else if(scatterCount===4){

            freeSpins+=15;

        }
        else if(scatterCount>=5){

            freeSpins+=25;

        }



        freeSpinText.innerHTML=freeSpins;


        message.innerHTML="🎉 FREE SPINS ACTIVATED!";


    }


}





function checkLines(){


    let totalWin=0;



    for(let row=0;row<3;row++){


        let line=[];


        for(let reel=0;reel<5;reel++){


            line.push(currentResult[reel][row]);


        }


        totalWin+=checkCombination(line);


    }





    if(totalWin>0){


        balance+=totalWin;


        balanceText.innerHTML=balance;


        winText.innerHTML=totalWin;


        message.innerHTML="🎉 WIN "+totalWin;


        playSound(winSound);


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



    if(count === 3){

    return Math.floor(bet * 0.5);

}

if(count === 4){

    return bet;

}

if(count === 5){

    if(line.every(symbol => symbol === "wild.png")){

        return 10 * bet;

    }

    return 3 * bet;

}

return 0;



    return 0;


}





spinButton.addEventListener("click",spin);
