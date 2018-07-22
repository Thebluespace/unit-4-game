/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++ Star Wars RPG ++++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++ by Thomas Greene ++++++++++++++++++++++++++++++++++++++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

var gameo = {
    characters: ["gamecharacterone","gamecharactertwo","gamecharacterthree","gamecharacterfour"],
    beaten: 0,
    characteractualname: "",
    characterselection: "", // id name
    charactername: "", //health id
    characterhealth: 0, //.health
    characterbaseatt: 0,
    characterattack: 0, //.attack
    enemyactualname: "",
    enemycharacter: "", // id name
    enemyname: "", // .name
    enemyhealth: 0,  //.health
    enemycounterattack: 0, // .attack
    wins: 0,
    loses: 0,
    attack: function() {
        try{
            gameo.enemyhealth = gameo.enemyhealth - gameo.characterattack;
            gameo.characterattack = gameo.characterattack + gameo.characterbaseatt;
            $(gameo.enemyname).text(gameo.enemyhealth.toString());

            $(gameo.enemycharacter).effect("shake");
            if (gameo.enemyhealth <= 0){
                gameo.enemyhealth = 0;
                $(gameo.enemyname).text(gameo.enemyhealth.toString());
                gameo.defeatedenemy();
                return;
            }
            gameo.characterhealth = gameo.characterhealth - gameo.enemycounterattack;
            $(gameo.charactername).text(gameo.characterhealth.toString());
            $(gameo.characterselection).effect("shake");
            if (gameo.characterhealth < 1) {
                gameo.characterhealth = 0;
                $(gameo.charactername).text(gameo.characterhealth.toString());
                gameo.addnewevent("enemy", gameo.characterselection);
                gameo.endGame("lose");
                return;
            }

        } catch(error) {
            alert("ATTACK ALERT\n" + error.message);
        }

    },
    addevent: function(){
        for (i=0; i < gameo.characters.length; i++) {
                $("#charactertile" + i).on("click", function(){
                    if (gameo.charactername == "") {
                        gameo.selectcharacter($(this));
                    } else if(gameo.enemycharacter == ""){
                        gameo.selectenemy($(this));
                    }
            });
        }
    },
    addnewevent: function(type, id){
        try {
            if (type === "character")
        {
            $(id).off();
            $(id).on("click", function(event) {
                gameo.attack();
            });

        }
        if (type === "enemy")
        {
            $(id).off();
        }
    } catch (error)
     {
         console.error(error);
     }
    },
    formReset: function()  {
        gameo.resetVariables();
        try {
            for (i=0; i < gameo.characters.length; i++) {
                try {
                    var charactertile = $('<div>');
                    charactertile.attr("id", "charactertile" + i);
                    $("#selectionarea").append(charactertile);
                    switch(i){

                        case 0:
                            gamecharacterone.addtoselectionarea();
                        break;

                        case 1:
                            gamecharactertwo.addtoselectionarea();
                        break;

                        case 2:
                            gamecharacterthree.addtoselectionarea();
                        break;

                        case 3:
                            gamecharacterfour.addtoselectionarea();
                        break;
                    }
                    
                } catch (error) {
                    console.error(error);
                }   
            }
            gameo.addevent();
            if(gameo.wins === 0 && gameo.loses === 0) {
                setTimeout(function() {alert("Welcome to the Star Wars RPG game!\nPlease choose a character by clicking to begin!\n\nRULES: Player must a choose character and defeat the rest of the remaining characters. Each character has different attack, counter attack, and health levels. Your character's attack power will grow with each attack. Choose wisely, may the force be with you. ")}, 250);
            }
        } catch (error) {
            console.error(error);
        }
        
    },
    selectenemy: function(event) {
        switch(event.attr("id")) {
            case "charactertile0":
                gameo.enemyname = "#chealth0";
                gameo.enemyhealth = gamecharacterone.characterhealth;
                gameo.enemycounterattack = gamecharacterone.charactercounterattack;
                gameo.enemyactualname = gamecharacterone.charactername;
            break;
            case "charactertile1":
                gameo.enemyname = "#chealth1";
                gameo.enemyhealth = gamecharactertwo.characterhealth;
                gameo.enemycounterattack = gamecharactertwo.charactercounterattack;
                gameo.enemyactualname = gamecharactertwo.charactername;
            break;
            case "charactertile2":
                gameo.enemyname = "#chealth2";
                gameo.enemyhealth = gamecharacterthree.characterhealth;
                gameo.enemycounterattack = gamecharacterthree.charactercounterattack;
                gameo.enemyactualname = gamecharacterthree.charactername;
            break;
            case "charactertile3":
                gameo.enemyname = "#chealth3";
                gameo.enemyhealth = gamecharacterfour.characterhealth;
                gameo.enemycounterattack = gamecharacterfour.charactercounterattack;
                gameo.enemyactualname = gamecharacterfour.charactername;
            break;
        }
        gameo.enemycharacter = "#" + event.attr("id");
        gameo.addnewevent("enemy", gameo.enemycharacter);
        $(event).appendTo("#enemytoattack");
        if(gameo.beaten === 0){
            if(gameo.wins === 0 && gameo.loses === 0) {
                setTimeout(function() {alert("Now click on your character to attack")},250);
            }
        }
    },
    defeatedenemy: function(event){    
        $(gameo.enemycharacter).appendTo("#selectionarea");
        $(gameo.enemycharacter).hide();
        gameo.enemycharacter = "";
        gameo.beaten += 1;
        if (gameo.beaten === 3){
            gameo.endGame("win");
            return;
        }
        if(gameo.wins === 0 && gameo.loses === 0) {
            setTimeout(function() {alert("Nice one!\nYou defeated: " + gameo.enemyactualname + "\n\nPlease click on a new enemy to continue!")},250);
        }
    },
    selectcharacter: function(event) {
        switch(event.attr("id")) {
            case "charactertile0":
                gameo.charactername = "#chealth0";
                gameo.characterattack = gamecharacterone.characterattack;
                gameo.characterbaseatt = gamecharacterone.characterattack;
                gameo.characterhealth = gamecharacterone.characterhealth;
                gameo.characteractualname = gamecharacterone.charactername;
            break;
            case "charactertile1":
                gameo.charactername = "#chealth1";
                //gameo.charactername = "gamecharactertwo";
                gameo.characterattack = gamecharactertwo.characterattack;
                gameo.characterbaseatt = gamecharactertwo.characterattack;
                gameo.characterhealth = gamecharactertwo.characterhealth;
                gameo.characteractualname = gamecharactertwo.charactername;
            break;
            case "charactertile2":
                gameo.charactername = "#chealth2";
                //gameo.charactername = "gamecharacterthree";
                gameo.characterattack = gamecharacterthree.characterattack;
                gameo.characterbaseatt = gamecharacterthree.characterattack;
                gameo.characterhealth = gamecharacterthree.characterhealth;
                gameo.characteractualname = gamecharacterthree.charactername;
            break;
            case "charactertile3":
                gameo.charactername = "#chealth3";
                //gameo.charactername = "gamecharacterfour";
                gameo.characterattack = gamecharacterfour.characterattack;
                gameo.characterbaseatt = gamecharacterfour.characterattack;
                gameo.characterhealth = gamecharacterfour.characterhealth;
                gameo.characteractualname = gamecharacterfour.charactername;
            break;
            default:
                alert(event);
            break;
        }
        gameo.characterselection = "#" + event.attr("id");
        $(event).appendTo("#yourcharactertile");
        gameo.addnewevent("character", gameo.characterselection);
        gameo.movetoenemy(event.attr("id"));
        if(gameo.wins === 0 && gameo.loses === 0) {
            setTimeout(function() {alert("Now choose an enemy to attack!")},250);
        }
    },
    movetoenemy: function(id) {
        var ids = ["charactertile0","charactertile1","charactertile2","charactertile3"];
        for (i=0; i < ids.length; i++){
            if (id != ids[i]){
                $("#" + ids[i]).appendTo("#availableenemies");
            }
        }

    },
    endGame: function(type) {
        try{
            if (type === "win"){
                gameo.wins += 1;
                var message = "You Won! \n Character used: " + gameo.characteractualname + "\n Health remaining: " + gameo.characterhealth + "\n Ending Attack Power: " + gameo.characterattack + "\n\n Wins: " + gameo.wins + "\n Loses: " + gameo.loses + "\n\n Please click ok to reset the game\nnote: tutorial prompts will no longer show";
                setTimeout(function(){alert(message)},250);
                gameo.removeTiles();
                gameo.formReset();

            } else if (type === "lose"){
                gameo.loses += 1;
                var message = "You Lost! \n Character used: " + gameo.characteractualname + "\n Ending Attack Power: " + gameo.characterattack + "\n Killing Enemy: " + gameo.enemyactualname + "\n Enemy Health Reamining: " + gameo.enemyhealth + "\n\n Wins: " + gameo.wins + "\n Loses: " + gameo.loses + "\n\n Please click ok to reset the game\nnote: tutorial prompts will no longer show";
                setTimeout(function(){alert(message)},250);
                gameo.removeTiles();
                gameo.formReset();
            }
        } catch(error) {
            console.error(error);
        }

    },
    resetVariables: function() {
        gameo.beaten = 0;
        gameo.characterselection = "";
        gameo.charactername = "";
        gameo.characterhealth = 0;
        gameo.characterbaseatt = 0;
        gameo.characterattack = 0;
        gameo.enemycharacter = "";
        gameo.enemyname = "";
        gameo.enemyhealth = 0;
        gameo.enemycounterattack = 0;
    },
    removeTiles: function(){
        for (i=0; i < gameo.characters.length; i++) {
            $("#charactertile" + i).remove();
        }
        $(".ui-effects-placeholder").remove();
    }
};

var gamecharacterone = {
    charactername: "Qui Gon Jinn",
    characterimage: "assets/images/QuigonJinn.jpeg",
    characterattack: 6,
    charactercounterattack: 10,
    characterhealth: 100,
    addtoselectionarea: function() {
        try {
            var charheader = $("<h1>");
            charheader.attr("id","cheader")
            charheader.text(gamecharacterone.charactername);
            $("#charactertile0").append(charheader);

            var charimg = $("<img>");
            charimg.attr("src",gamecharacterone.characterimage);
            charimg.attr("class", "cimg")
            $("#charactertile0").append(charimg);

            var charhealth = $("<h1>");
            charhealth.attr("id", "chealth0");
            charhealth.text(gamecharacterone.characterhealth.toString());
            $("#charactertile0").append(charhealth);
        } catch (error) {
            console.error(error);
        }
    }
};

var gamecharactertwo = {
    charactername: "Count Dooku",
    characterimage: "assets/images/countdooku.jpeg",
    characterattack: 8,
    charactercounterattack: 12,
    characterhealth: 80,
    addtoselectionarea: function() {
        try {
            var charheader = $("<h1>");
            charheader.attr("id","cheader")
            charheader.text(gamecharactertwo.charactername);
            $("#charactertile1").append(charheader);

            var charimg = $("<img>");
            charimg.attr("src",gamecharactertwo.characterimage);
            charimg.attr("class", "cimg")
            $("#charactertile1").append(charimg);

            var charhealth = $("<h1>");
            charhealth.attr("id", "chealth1");
            charhealth.text(gamecharactertwo.characterhealth.toString());
            $("#charactertile1").append(charhealth);
        } catch (error) {
            console.error(error);
        }
    }
};

var gamecharacterthree = {
    charactername: "General Grevious",
    characterimage: "assets/images/generalgrevious.png",
    characterattack: 10,
    charactercounterattack: 20,
    characterhealth: 70,
    addtoselectionarea: function() {
        try {
            var charheader = $("<h1>");
            charheader.attr("id","cheader")
            charheader.text(gamecharacterthree.charactername);
            $("#charactertile2").append(charheader);

            var charimg = $("<img>");
            charimg.attr("src",gamecharacterthree.characterimage);
            charimg.attr("class", "cimg")
            $("#charactertile2").append(charimg);

            var charhealth = $("<h2>");
            charhealth.attr("id", "chealth2");
            charhealth.text(gamecharacterthree.characterhealth.toString());
            $("#charactertile2").append(charhealth);
        } catch (error) {
            console.error(error);
        }
    }
};

var gamecharacterfour = {
    charactername: "Luminara",
    characterimage: "assets/images/luminara.jpg",
    characterattack: 5,
    charactercounterattack: 15,
    characterhealth: 120,
    addtoselectionarea: function() {
        try {
            var charheader = $("<h1>");
            charheader.attr("id","cheader")
            charheader.text(gamecharacterfour.charactername);
            $("#charactertile3").append(charheader);

            var charimg = $("<img>");
            charimg.attr("src",gamecharacterfour.characterimage);
            charimg.attr("class", "cimg")
            $("#charactertile3").append(charimg);

            var charhealth = $("<h1>");
            charhealth.attr("id", "chealth3");
            charhealth.text(gamecharacterfour.characterhealth.toString());
            $("#charactertile3").append(charhealth);
        } catch (error) {
            console.error(error);
        }
    }
};
