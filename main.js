function RdmBtwTwoNbrs(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}

class Fighter {
    constructor(name, life, strength, armor, dexterity) {
        this.name = name;
        this.life = life;
        this.strength = strength;
        this.armor = armor;
        this.dexterity = dexterity
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
        console.log(true);
    }
});

document.querySelector('.player2-turn').addEventListener("click", function() {
    if (document.querySelector('.player2-turn').style.backgroundColor == "green") {
        console.log(true);
    }
});






