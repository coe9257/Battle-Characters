//modified critical strike damage;  
//fixed start new game function so you cannot start it over until game is over;
//Fixed reload new game by removing all element nods before reload


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

function dodge_attack(defender_dexterity, attacker_dexterity) {
    let defender_dexterity_comparison = defender_dexterity - attacker_dexterity;

    let roll = RdmBtwTwoNbrs(1, 100);

    if (defender_dexterity_comparison > roll) {
         return true
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
        let did_defender_dodge_attack = dodge_attack(this.dexterity, dexterity);
        let attack_damage_reduced = Math.trunc(((this.armor / 100) * attack));
            if (did_critical_strike_hit == true) {
                // console.log(`attack damage reduced before: `,attack_damage_reduced);
                    attack_damage_reduced += 10;
                    attack_damage_reduced *= 1.5;
                // console.log(`attack damage reduced after: `,attack_damage_reduced);
            }
        //life reduced
        if (did_defender_dodge_attack == false) {
            this.life -= attack_damage_reduced;
        }
        //UI interface of damage taken
        function playerDamageNotification(name) {

            let crit = "";

            if (did_critical_strike_hit == true && did_defender_dodge_attack == false) {
                crit = "Critical Strike!";
            }

            if (did_defender_dodge_attack == false) {
                document.querySelector('.middle-space').textContent = `${crit} ${name} takes ${attack_damage_reduced} damage!`;
                crit = "";  
            }
            
            if (did_defender_dodge_attack == true) {
                document.querySelector('.middle-space').textContent = `${name} has dodged the Attack!`;
            }
        }
            playerDamageNotification(this.name);
    }

    updateLife(className) {
        // console.log(className);
        let life = Math.trunc(this.life);
            // console.log(life);
        document.querySelector(`.` + className).textContent = life;
    }

    checkDeath(player) {
        console.log(player)
        let name = this.name;

        if (this.life < 1) {
            function nameDeath() {
                    console.log(`name`, name);
                    console.log(document.querySelector('.player1_p_tag').textContent);
                    console.log(document.querySelector('.player2_p_tag').textContent);
                if (document.querySelector('.player1_p_tag').textContent == player.name) {
                        console.log('firing if');
                        let previousText = document.querySelector('.middle-space').textContent;
                    document.querySelector('.player1').textContent = "DEATH";
                    document.querySelector('.player1-turn').style.backgroundColor = "red";
                    document.querySelector('.player1-turn').textContent = "STOP";
                        console.log(`previousText: `, previousText, `name: `, name);
                    document.querySelector('.middle-space').textContent = `${previousText} ${name} is DEAD!`;
                }else if (document.querySelector('.player2_p_tag').textContent == player.name){
                        console.log('firing else if');
                        let previousText = document.querySelector('.middle-space').textContent;
                    document.querySelector('.player2').textContent = "DEATH";
                    document.querySelector('.player2-turn').style.backgroundColor = "red"
                    document.querySelector('.player2-turn').textContent = "STOP";
                        console.log(`previousText: `, previousText, `name: `, name);
                    document.querySelector('.middle-space').textContent = `${previousText} ${name} is DEAD!`;
                };
            };
            nameDeath();

            function newGameText() {
                document.querySelector('.space-bottom').style.backgroundColor = "white";
                document.querySelector('.space-bottom').textContent = "New Game";
            };
            newGameText()
        };
    };
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
                // console.log(name1_taken);
    
            let newArray3 = newArray2;
    
            let player_2_index = RdmBtwTwoNbrs(0, 5);
    
            let name2_taken = newArray3.splice(player_2_index, 1);
                // console.log(name2_taken);
    
            let twoNamesArray = [name1_taken[0], name2_taken[0]];
                
            return twoNamesArray;
        };
        let names = player1_name_creation();
        // console.log(names);
        player_1.name = names[0];
        player_2.name = names[1];
        function add_p_element_to_players() {
            let player_1_p_name = document.createElement('p');
                player_1_p_name.style.fontSize = `1.75rem`;
                player_1_p_name.textContent = names[0];
                player_1_p_name.className = "player1_p_tag";
                document.querySelector('.player1').appendChild(player_1_p_name);
            
            let player_2_p_name = document.createElement('p');
                player_2_p_name.style.fontSize = `1.75rem`;
                player_2_p_name.textContent = names[1];
                player_2_p_name.className = "player2_p_tag";
                document.querySelector('.player2').appendChild(player_2_p_name);
        };
        add_p_element_to_players();
    };
    addNames()
    
    function loadLife() {
        document.querySelector('.player1-score').textContent = player_1.life;
        document.querySelector('.player2-score').textContent = player_2.life;
    }
    loadLife();

    function firstMove() {
        (function () {
            let turn = RdmBtwTwoNbrs(0, 1000);
            if (turn % 2 == 0) {
                    // console.log(true);
                document.querySelector('.player1-turn').textContent = "GO!";
                document.querySelector('.player1-turn').style.backgroundColor = "green";

                document.querySelector('.player2-turn').textContent = "STOP";
                document.querySelector('.player2-turn').style.backgroundColor = "red";
            }else {
                    // console.log(false);
                document.querySelector('.player2-turn').textContent = "GO!";
                document.querySelector('.player2-turn').style.backgroundColor = "green";

                document.querySelector('.player1-turn').textContent = "STOP!";
                document.querySelector('.player1-turn').style.backgroundColor = "red";
            }
        })();
    };
    firstMove();

    function addPlayerAttributesToScreen(p1, p2){
        // this.name = name;
        // this.life = life;
        // this.strength = strength;
        // this.armor = armor;
        // this.dexterity = dexterity;
        function playerOneAttributes() {
            let p1_life = p1.strength;
            let p1_strength = p1.strength;
            let p1_armor = p1.armor;
            let p1_dexterity = p1.dexterity;

            let p1_p_attributes_container = document.createElement('div');
                p1_p_attributes_container.setAttribute('style', 'display: flex; flex-direction: column; justify-content: space-around; align-items: flex-start')
                p1_p_attributes_container.className = 'Stats-Container';

                let p1_life_p = document.createElement('p');
                    p1_life_p.className = "pStatTags";
                    p1_life_p.textContent = `Life: ${p1_life}`;

                let p1_strength_p = document.createElement('p');
                    p1_strength_p.className = "pStatTags";
                    p1_strength_p.textContent = `Strength: ${p1_strength}`;

                let p1_armor_p = document.createElement('p');
                    p1_armor_p.className = "pStatTags";
                    p1_armor_p.textContent = `Armor: ${p1_armor}`;

                let p1_dexterity_p = document.createElement('p');
                    p1_dexterity_p.className = "pStatTags";
                    p1_dexterity_p.textContent = `Dexterity: ${p1_dexterity}`;

                p1_p_attributes_container.appendChild(p1_life_p);
                p1_p_attributes_container.appendChild(p1_strength_p);
                p1_p_attributes_container.appendChild(p1_armor_p);
                p1_p_attributes_container.appendChild(p1_dexterity_p);                
                    
            document.querySelector('.player1').appendChild(p1_p_attributes_container);
        }
        playerOneAttributes();

        function playerTwoAttributes() {
            let p2_life = p2.strength;
            let p2_strength = p2.strength;
            let p2_armor = p2.armor;
            let p2_dexterity = p2.dexterity;

            let p2_p_attributes_container = document.createElement('div');
                p2_p_attributes_container.setAttribute('style', 'display: flex; flex-direction: column; justify-content: space-around; align-items: flex-start')
                p2_p_attributes_container.className = 'Stats-Container';

                let p2_life_p = document.createElement('p');
                    p2_life_p.className = "pStatTags";
                    p2_life_p.textContent = `Life: ${p2_life}`;

                let p2_strength_p = document.createElement('p');
                    p2_strength_p.className = "pStatTags";
                    p2_strength_p.textContent = `Strength: ${p2_strength}`;

                let p2_armor_p = document.createElement('p');
                    p2_armor_p.className = "pStatTags";
                    p2_armor_p.textContent = `Armor: ${p2_armor}`;

                let p2_dexterity_p = document.createElement('p');
                    p2_dexterity_p.className = "pStatTags";
                    p2_dexterity_p.textContent = `Dexterity: ${p2_dexterity}`;

                p2_p_attributes_container.appendChild(p2_life_p);
                p2_p_attributes_container.appendChild(p2_strength_p);
                p2_p_attributes_container.appendChild(p2_armor_p);
                p2_p_attributes_container.appendChild(p2_dexterity_p);                
                    
            document.querySelector('.player2').appendChild(p2_p_attributes_container);
        }
        playerTwoAttributes()
    }
    addPlayerAttributesToScreen(player_1, player_2)
}
pageLoad();

document.querySelector('.player1-turn').addEventListener("click", function() {
    if (document.querySelector('.player1-turn').style.backgroundColor == "green") {
        let attack = player_1.strength;
        let attacker_dexterity = player_1.dexterity
        // console.log(`attack: `, attack);
        player_2.defend(attack, attacker_dexterity);
        player_2.updateLife(`player2-score`);


        function changeTurn() {
            document.querySelector('.player1-turn').style.backgroundColor = "red";
            document.querySelector('.player1-turn').textContent = "STOP";

            document.querySelector('.player2-turn').style.backgroundColor = "green";
            document.querySelector('.player2-turn').textContent = "GO";
        }
        changeTurn();

        player_2.checkDeath(player_2);

    }
});

document.querySelector('.player2-turn').addEventListener("click", function() {
    if (document.querySelector('.player2-turn').style.backgroundColor == "green") {
        let attack = player_2.strength;
        let attacker_dexterity = player_2.dexterity
        // console.log(`attack: `, attack);
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

    player_1.checkDeath(player_1);
});

document.querySelector('.space-bottom').addEventListener("click", function() {
    function newCharacters() {

        function removePlayer1Nodes(parent) {
            while (document.querySelector('.player1').firstChild) {
                document.querySelector('.player1').removeChild(document.querySelector('.player1').firstChild);
            }
        };

        function removePlayer2Nodes(parent) {
            while (document.querySelector('.player2').firstChild) {
                document.querySelector('.player2').removeChild(document.querySelector('.player2').firstChild);
            }
        };

        removePlayer1Nodes();
        removePlayer2Nodes();

        player_1 = create_player(1);
        player_2 = create_player(2);

        function player_name_creation() {

            let names = ["Bob", "Joe", "Allen", "Karen", "Faith", "Kathy"];
    
            let player_1_index = RdmBtwTwoNbrs(0, 6);
    
            let newArray2 = names;
    
            let name1_taken = newArray2.splice(player_1_index, 1);
                // console.log(name1_taken);
    
            let newArray3 = newArray2;
    
            let player_2_index = RdmBtwTwoNbrs(0, 5);
    
            let name2_taken = newArray3.splice(player_2_index, 1);
                // console.log(name2_taken);
    
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
    if (document.querySelector('.space-bottom').style.backgroundColor == "white") {
        console.log(true);
        newCharacters();
    }
});






