//1: Age in Day
function ageInDays()
{
    var birthYear = prompt("What year you born");
    let ageInDayss = (2021-birthYear)*365;
    let h1 = document.createElement('h1');
    let textInTag = document.createTextNode(`You are ${ageInDayss} days`);
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textInTag);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

//2:Add it Align It
function addIt(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-add-gen');
    image.src = "./static/download.jpg";
    div.appendChild(image);
}

//3: Rock, Paper, Scissors
function rpsGame(choice){
    console.log(choice);
    let userIp,botIp;
    userIp = choice.id;
    botIp = numToChoice(randomToRpsIP()); 
    const result = winner(userIp,botIp);
    let message = getMessage(result);
    rpsFrontEnd(choice.id, botIp, message);
}

function randomToRpsIP(){
    return Math.floor(Math.random()*3);
}

function numToChoice(num){
    return ['rock','paper','scissors'][num];
}

function winner(userIp,botIp){
    const possibilities = {
        'rock':{'scissors':1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1, 'paper':0.5, 'scissors':0},
        'scissors':{'paper':1, 'scissors':0.5, 'rock':0},
    };

    let userScore = possibilities[userIp][botIp];
    let botScore = possibilities[botIp][userIp];

    return [userScore, botScore];
}

function getMessage([userScore,botScore]){
    if(userScore === 0){
        return {'message':'You Lost..!','color':'red'};
    }else if( userScore === 0.5){
        return {'message':'It\'s Tie..!','color':'yellow'};
    }else{
        return {'message':'You Won..!','color':'green'};
    }
}

function rpsFrontEnd(userIp,botIp, message){
    const imgOpt = {
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
    };
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let userDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let msgDiv = document.createElement('div');

    userDiv.innerHTML = `<img src='${imgOpt[userIp]}' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)'/>`;
    msgDiv.innerHTML = `<h1 style='color:${message.color}; font-size:60px; padding:30px;'>${message.message}</h1>`
    botDiv.innerHTML = `<img src='${imgOpt[botIp]}' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)'/>`;
    
    document.getElementById('flex-box-result-div').appendChild(userDiv);
    document.getElementById('flex-box-result-div').appendChild(msgDiv);
    document.getElementById('flex-box-result-div').appendChild(botDiv);
}

//BlackJack
let blacjackGame = {
    'user':{'scoreSpan':'#your-blackjack-result', 'div':'#user-box',score:0},
    'bot':{'scoreSpan':'#bot-blackjack-result', 'div':'#bot-box',score:0},
    'cards':['A','2','3','4','5','6','7','8','9','10','J','Q','K'],
    'cardsValue':{'A':[1,11],'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10},
    'wins':0,
    'losss':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,
};

const USER = blacjackGame['user'];
const BOT = blacjackGame['bot'];

const hitSound = new Audio('./static/sounds/swish.m4a');
const winSound = new Audio('./static/sounds/cash.mp3');
const lossSound = new Audio('./static/sounds/aww.mp3');

const showCard = (currentPlayer) =>{
    if(currentPlayer.score <= 21){
        let cardImg = document.createElement('img');
        let card = blacjackGame.cards[Math.floor(Math.random()*13)] 
        cardImg.src = `./static/images/${card}.png`;
        document.querySelector(currentPlayer['div']).appendChild(cardImg);
        hitSound.play();
        updateScore(card,currentPlayer);
    }
}

const blackjackHit = () =>{
    if(blacjackGame.isStand === false){
        showCard(USER);
        showScore(USER);
    }
}
const sleep = (ms)=>{
    return new Promise(resolve => setTimeout(resolve,ms));
}
const botLogic = async() =>{
    blacjackGame.isStand = true;
    while(BOT.score < 16 && blacjackGame.isStand === true){
        showCard(BOT);
        showScore(BOT);
        await sleep(1000);
    }

    blacjackGame.turnsOver = true;
    showResults(computeWinner());
}

const blackjackDeal = () =>{
    if(blacjackGame.isStand && blacjackGame.turnsOver){
        blacjackGame.isStand = false;
        showResults(computeWinner());
        let userImage = document.querySelector('#user-box').querySelectorAll('img');
        let botImage = document.querySelector('#bot-box').querySelectorAll('img');

        for(let i=0;i<userImage.length;i++){
            userImage[i].remove();
        }
        
        for(let i=0;i<botImage.length;i++){
            botImage[i].remove();
        }

        USER.score = 0;
        BOT.score = 0;

        document.querySelector(USER.scoreSpan).textContent = 0;
        document.querySelector(USER.scoreSpan).style.color = 'white';

        document.querySelector(BOT.scoreSpan).textContent = 0;
        document.querySelector(BOT.scoreSpan).style.color = 'white';

        document.querySelector('#blackjack-result').textContent = 'Let\'s Play';
        document.querySelector('#blackjack-result').style.color = 'black';
        blacjackGame.turnsOver =true; 
    }
}

const updateScore = (card,currentPlayer) =>{
    if(card ==='A'){
        if(currentPlayer.score + blacjackGame.cardsValue[card][1] <= 21){
            currentPlayer.score += blacjackGame.cardsValue[card][1];
        }else{
            currentPlayer.score += blacjackGame.cardsValue[card][0];
        }
    }else{
    currentPlayer['score'] += blacjackGame['cardsValue'][card];
    }
}

const showScore = (currentPlayer) =>{
    if(currentPlayer.score >21){
        document.querySelector(currentPlayer.scoreSpan).textContent ="BUST!";
        document.querySelector(currentPlayer.scoreSpan).style.color = 'red';
    }else{
        document.querySelector(currentPlayer.scoreSpan).textContent = currentPlayer.score;
    }   
}

document.querySelector('#blackjack-hit-btn').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-btn').addEventListener('click',botLogic);
document.querySelector('#blackjack-deal-btn').addEventListener('click',blackjackDeal);

const computeWinner = ()=>{
    let winner;
    if(USER.score <= 21){
        if(USER.score > BOT.score || BOT.score > 21){
            blacjackGame.wins =blacjackGame.wins+1;
            winner = USER;
        }else if(USER.score < BOT.score){
            blacjackGame.losss=blacjackGame.losss+1;
            winner = BOT;
        }else if(USER.score === BOT.score){
            blacjackGame.draws = blacjackGame.draws+1;
        }
    }else if(USER.score > 21 && BOT.score <=21){
        blacjackGame.losss=blacjackGame.losss+1;
        winner = BOT;
    }else if(USER.score > 21 && BOT.score>21){
        blacjackGame.draws = blacjackGame.draws+1;
    } 
    return winner;
}

const showResults = (winner) =>{
    let message,messageColor;

    if(blacjackGame.turnsOver === true){
        if(winner === USER){
            message = 'You Won..!';
            messageColor = 'green';
            winSound.play();
        }else if (winner === BOT){
            message = 'You Lost..!';
            messageColor = 'red';
            lossSound.play();
        }else{
            message = 'You Drew..!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;

        document.querySelector('#wins-tab').textContent = blacjackGame.wins;
        document.querySelector('#loss-tab').textContent = blacjackGame.losss;
        document.querySelector('#draw-tab').textContent = blacjackGame.draws;
    }
}