function RdmBtwTwoNbrs(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}

function critial_strike_chance(attacker_strength, attacker_dexterity) {
        // console.log(attacker_dexterity);
        //Make the number into thousands
    let critical_strike_number = Math.trunc((attacker_dexterity * 10));
        // console.log(`attacker_dexterity: `, attacker_dexterity, `critical_strike_number: `, critical_strike_number);
        // console.log(critical_strike_chance);
    let number_between_1000 = RdmBtwTwoNbrs(1, 1000);

    // console.log(`critical_strike_chance: `, critical_strike_number, `MathRdmNbr: `, number_between_1000);

    if (number_between_1000 <= critical_strike_number) {
        return true;
    }else {
        return false;
    }

}

class Fighter {
    constructor(name, life, strength, armor, dexterity) {
        this.name = name;
        this.life = life;
        this.strength = strength;
        this.armor = armor;
        this.dexterity = dexterity
    };

    defend(attack, dexterity) {

        let did_critical_strike_hit = critial_strike_chance(attack, dexterity);
        let attack_damage_reduced = Math.trunc(((this.armor / 100) * attack));
            if (did_critical_strike_hit == true) {
                console.log(`attack damage reduced before: `,attack_damage_reduced);
                    attack_damage_reduced += 10;
                    attack_damage_reduced *= 2;
                console.log(`attack damage reduced after: `,attack_damage_reduced);
            }
        //life reduced
        this.life -= attack_damage_reduced;
        //UI interface of damage taken
        function playerDamageNotification(name) {
            let crit = "";
            if (did_critical_strike_hit == true) {
                crit = "Critical Strike!";
            }
            document.querySelector('.middle-space').textContent = `${crit} ${name} takes ${attack_damage_reduced} damage!`;
            crit = "";                                                   
        }
            playerDamageNotification(this.name);
    }

    updateLife(className) {
        console.log(className);
        let life = Math.trunc(this.life);
            console.log(life);
        document.querySelector(`.` + className).textContent = life;
    }

    checkDeath() {
        let name = this.name;
        if (this.life < 1) {
            function nameDeath() {
                console.log(`name`, name)
                if (document.querySelector('.player1').textContent == name) {
                        let previousText = document.querySelector('.middle-space').textContent;
                    document.querySelector('.player1').textContent = "DEATH";
                    document.querySelector('.player1-turn').style.backgroundColor = "red";
                    document.querySelector('.player1-turn').textContent = "STOP";
                    document.querySelector('.middle-space').textContent = `${previousText} ${name} is DEAD`;
                }else if (document.querySelector('.player2').textContent == name){
                        let previousText = document.querySelector('.middle-space').textContent;;
                    document.querySelector('.player2').textContent = "DEATH";
                    document.querySelector('.player2-turn').style.backgroundColor = "red"
                    document.querySelector('.player2-turn').textContent = "STOP";
                    document.querySelector('.middle-space').textContent = `${previousText} ${name} is DEAD`;
                }
            }
            nameDeath();
            function newGameText() {
                document.querySelector('.space-bottom').style.backgroundColor = "white";
                document.querySelector('.space-bottom').textContent = "New Game";
            };
            newGameText()
        };
    }
};

function create_player(nbr) {
    let name = document.querySelector('.' + `player` + nbr).textContent;
    let player = new Fighter(name, RdmBtwTwoNbrs(0, 100), RdmBtwTwoNbrs(0, 80), 
        RdmBtwTwoNbrs(0, 50), RdmBtwTwoNbrs(0, 60));
    
    return player;
};

let player_1 = create_player(1);
let player_2 = create_player(2);

function pageLoad() {
    function addNames() {
        function player1_name_creation() {

            let names = ["Bob", "Joe", "Allen", "Karen", "Faith", "Kathy"];
    
            let player_1_index = RdmBtwTwoNbrs(0, 6);
    
            let newArray2 = names;
    
            let name1_taken = newArray2.splice(player_1_index, 1);
                console.log(name1_taken);
    
            let newArray3 = newArray2;
    
            let player_2_index = RdmBtwTwoNbrs(0, 5);
    
            let name2_taken = newArray3.splice(player_2_index, 1);
                console.log(name2_taken);
    
            let twoNamesArray = [name1_taken[0], name2_taken[0]];
                
            return twoNamesArray;
        };
        let names = player1_name_creation();
        console.log(names);
        document.querySelector('.player1').textContent = names[0];
        document.querySelector('.player2').textContent = names[1];
        player_1.name = names[0];
        player_2.name = names[1];
    };
        addNames()
    function firstMove() {
        (function () {
            let turn = RdmBtwTwoNbrs(0, 1000);
            if (turn % 2 == 0) {
                    console.log(true)
                document.querySelector('.player1-turn').textContent = "GO!";
                document.querySelector('.player1-turn').style.backgroundColor = "green";

                document.querySelector('.player2-turn').textContent = "STOP";
                document.querySelector('.player2-turn').style.backgroundColor = "red";
            }else {
                    console.log(false);
                document.querySelector('.player2-turn').textContent = "GO!";
                document.querySelector('.player2-turn').style.backgroundColor = "green";

                document.querySelector('.player1-turn').textContent = "STOP!";
                document.querySelector('.player1-turn').style.backgroundColor = "red";
            }
        })();
    };
        firstMove();
    function loadLife() {
        document.querySelector('.player1-score').textContent = player_1.life;
        document.querySelector('.player2-score').textContent = player_2.life;
    }
        loadLife();
}
pageLoad();

document.querySelector('.player1-turn').addEventListener("click", function() {
    if (document.querySelector('.player1-turn').style.backgroundColor == "green") {
        let attack = player_1.strength;
        let attacker_dexterity = player_1.dexterity
        console.log(`attack: `, attack);
        player_2.defend(attack, attacker_dexterity);
        player_2.updateLife(`player2-score`);


        function changeTurn() {
            document.querySelector('.player1-turn').style.backgroundColor = "red";
            document.querySelector('.player1-turn').textContent = "STOP";

            document.querySelector('.player2-turn').style.backgroundColor = "green";
            document.querySelector('.player2-turn').textContent = "GO";
        }
        changeTurn();

        player_2.checkDeath();

    }
});

document.querySelector('.player2-turn').addEventListener("click", function() {
    if (document.querySelector('.player2-turn').style.backgroundColor == "green") {
        let attack = player_2.strength;
        let attacker_dexterity = player_2.dexterity
        console.log(`attack: `, attack);
        player_1.defend(attack, attacker_dexterity);
        player_1.updateLife(`player1-score`);

        function changeTurn() {
            document.querySelector('.player2-turn').style.backgroundColor = "red";
            document.querySelector('.player2-turn').textContent = "STOP";
    
            document.querySelector('.player1-turn').style.backgroundColor = "green";
            document.querySelector('.player1-turn').textContent = "GO";
        }
        changeTurn();

    }

    player_1.checkDeath();
});

document.querySelector('.space-bottom').addEventListener("click", function() {
    function newCharacters() {
        player_1 = create_player(1);
        player_2 = create_player(2);

        function player_name_creation() {

            let names = ["Bob", "Joe", "Allen", "Karen", "Faith", "Kathy"];
    
            let player_1_index = RdmBtwTwoNbrs(0, 6);
    
            let newArray2 = names;
    
            let name1_taken = newArray2.splice(player_1_index, 1);
                console.log(name1_taken);
    
            let newArray3 = newArray2;
    
            let player_2_index = RdmBtwTwoNbrs(0, 5);
    
            let name2_taken = newArray3.splice(player_2_index, 1);
                console.log(name2_taken);
    
            let twoNamesArray = [name1_taken[0], name2_taken[0]];
                
            return twoNamesArray;
        };
        let names = player_name_creation();

        pageLoad();

        function resetPlayAgain() {
            document.querySelector('.space-bottom').style.backgroundColor = "rgb(83, 81, 81)";
            document.querySelector('.space-bottom').textContent = "";
            document.querySelector('.middle-space').textContent = "";
        }
        resetPlayAgain()

    }
    newCharacters()
})






