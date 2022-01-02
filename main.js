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

function randomNumbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
randomNumbers();      


function dodged(strength, dodge) {
    let mathRdm = Math.floor(Math.random() * 101);
    let dodgeChance = dodge - (strength / 2);
        // console.log(`mathRDM: `, mathRdm);
        // console.log(`dodgeChance: `, dodgeChance);

    let chance = false;

    if (dodgeChance > mathRdm) {
        chance = true;
        console.log("DODGED!");
        document.querySelector('.footer').textContent = "";
    }
    return chance;

}

class Player { 
    constructor(name, life, armor, strength, agility) {
        this.name = name;
        this.life = life;
        this.armor = armor;
        this.strength = strength;
        this.agility = agility;
    }

    attack(opponent) {
        opponent.defend(this.strength);
    }

    defend(strength) {

        let dChance = dodged(strength, this.agility)

        let player = this.name
        // let playerHTMLScore = '.' + this.name + `-score`;
        let playerTurn = '.' + player + '-turn';
        let armor = this.armor;

        console.log(`dChance: ${dChance}`);

        if (dChance == true) {
            document.querySelector(".footer").textContent = `${player} has dodged!`;
        }

        if (dChance != true) {
            console.log(`armor: ${armor}; strength: ${strength}`)
            console.log(`calculation`, ((100 - armor) / 100) * strength );
            let takenDamage = (((100 - armor) / 100) * strength);
            document.querySelector('.footer').textContent = `${player} 
                life (${Math.trunc(this.life)}) takes ${Math.trunc(takenDamage)} damage`;
                console.log(`takenDamage: ${takenDamage}; Life: ${this.life}`);

                console.log(`life before: ${this.life}`);
            this.life -= takenDamage;
                console.log(`life after: ${this.life}`);
        }

        let currentLife = this.life;
        let name1 = this.name

        function updateLife() {
            if (name1.includes(`-1-`)) {
                document.querySelector(`.player1-score`).textContent = `${Math.trunc(currentLife)}`;
            }else {
                document.querySelector(`.player2-score`).textContent = `${Math.trunc(currentLife)}`;
            }
        }
        updateLife();

        dChance = false;

        function lifeCheck() {
            if (currentLife < 1) {
                if (name1.includes(`-1-`)) {
                    document.querySelector(`.player1`).textContent = "DEAD";
                    document.querySelector(`.player1-turn`).style.backgroundColor = "red";
                }else {
                    document.querySelector(`.player2`).textContent = "DEAD";
                    document.querySelector(`.player2-turn`).style.backgroundColor = "red";
                }

                function startOver() {
                    // document.querySelector('.space-bottom').style.backgroundColor = "green";
                    // document.querySelector('.space-bottom').style.color = "blue";
                    // document.querySelector('.space-bottom').textContent = "Play Again?";
                }
                startOver();
            }
        }
        lifeCheck()
    }
}

function createPlayer(nbr) {
    let a = randomNumbers(1, 99);
    let b = randomNumbers(1, 99);
    let c = randomNumbers(1, 99);
    let d = randomNumbers(1, 99);
    let e = randomNumbers(1, 99);
    let name = `Player-${nbr}-`+ a + b + c + d + e;
    return name;
};

let playerName1 = createPlayer(`1`);
let playerName2 = createPlayer(`2`);

console.log(`playerName1:`, playerName1, randomNumbers(1, 99), randomNumbers(1, 99), randomNumbers(1, 99), randomNumbers(1, 99) );
console.log(`playerName2:`, playerName2, randomNumbers(1, 99), randomNumbers(1, 99), randomNumbers(1, 99), randomNumbers(1, 99) );

let player1 = new Player(playerName1, randomNumbers(1, 99), randomNumbers(1, 99), randomNumbers(1, 99), randomNumbers(1, 99) );
let player2 = new Player(playerName2, randomNumbers(1, 99), randomNumbers(1, 99), randomNumbers(1, 99), randomNumbers(1, 99) );

function loadLife() {
    document.querySelector('.player1-score').textContent = player1.life;
    document.querySelector('.player2-score').textContent = player2.life;
}
loadLife();

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




