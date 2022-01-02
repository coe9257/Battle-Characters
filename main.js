function initialPlayerMoveLoad() {
    let number;
        function diceRoll() {
            let a = Math.floor(Math.random() * 10);
            number = a;
        }
    diceRoll();

    if (number % 2) {
        document.querySelector(".player1-turn").style.backgroundColor = "green";
        document.querySelector(".player1-turn").textContent = "GO";
        document.querySelector(".player2-turn").style.backgroundColor = "red";
        document.querySelector(".player2-turn").textContent = "STOP";
    }else {
        document.querySelector(".player2-turn").style.backgroundColor = "green";
        document.querySelector(".player2-turn").textContent = "GO";
        document.querySelector(".player1-turn").style.backgroundColor = "red";
        document.querySelector(".player1-turn").textContent = "STOP";
    }

}
initialPlayerMoveLoad();

function startOver() {
    // document.querySelector('.space-bottom').style.backgroundColor = "green";
    // document.querySelector('.space-bottom').style.color = "blue";
    // document.querySelector('.space-bottom').textContent = "Play Again?";
}

class Player { 
    constructor(name, life, armor, strength) {
        this.name = name;
        this.life = life;
        this.armor = armor;
        this.strength = strength;
    }

    attack(opponent) {
        opponent.defend(this.strength);
    }

    defend(strength) {
        this.life -= strength;
        let player = this.name
        let playerHTMLScore = '.' + this.name + `-score`;
        let playerTurn = '.' + player + '-turn';
        let life = this.life;

        function lifeCheck() {
            if (life <= 0) {
                document.querySelector(`.` + player).textContent = "DEAD";
                    console.log(playerTurn);
                document.querySelector(`.` + player + '-turn').style.backgroundColor = "red";
                document.querySelector(`.` + player + '-score').textContent = 0;
                startOver();
            } else {
                function updateLife() {
                    document.querySelector(playerHTMLScore).textContent = life;
                }
                updateLife();
            }
        }
        lifeCheck()
    }
}

let player1 = new Player("player1", 55, 25, 18);
let player2 = new Player("player2", 70, 15, 26);

document.querySelector(".player1-turn").addEventListener("click", function() {
    if (document.querySelector(".player1-turn").style.backgroundColor == "green") {
        document.querySelector('.player1-turn').style.backgroundColor = "red";
        document.querySelector('.player2-turn').style.backgroundColor = "green";
        document.querySelector('.player1-turn').textContent = "STOP";
        document.querySelector('.player2-turn').textContent = "GO";
        player1.attack(player2);
    };
});

document.querySelector(".player2-turn").addEventListener("click", function() {
    if (document.querySelector(".player2-turn").style.backgroundColor == "green") {
        document.querySelector('.player1-turn').style.backgroundColor = "green";
        document.querySelector('.player2-turn').style.backgroundColor = "red";
        document.querySelector('.player1-turn').textContent = "GO";
        document.querySelector('.player2-turn').textContent = "STOP";
        player2.attack(player1)
    }
});

document.querySelector(".player2-turn").addEventListener("click", function() {
    if (document.querySelector(".space-bottom").style.backgroundColor == "green") {

    }
});




