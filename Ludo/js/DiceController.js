DiceController = function (game) {
    
    this.dice = getNewDice(game);
    for (var i = 0; i < this.dice.length; ++i){
        var uuid = this.getUuid();
        this.dice[i].uniqueId = uuid;
    }
        
};

DiceController.prototype.rollDice = function(currentPlayer){
    currentPlayer.rollDice(this.dice);
};

DiceController.prototype.rollDiceActivity = function(currentPlayer, diceObject){
    currentPlayer.rollDiceActivity(this.dice, diceObject);
};

DiceController.prototype.setDiceValue = function(currentPlayer){
    
    switch(currentPlayer.diceObject.length)
    {
        case 0:
            return false;
        case 1:
            this.dice[0].setCurrentPlayer(currentPlayer);
            this.dice[0].setValue(currentPlayer.diceObject[0]);
            return true;
        case 2:
            this.dice[0].setCurrentPlayer(currentPlayer);
            this.dice[0].setValue(currentPlayer.diceObject[0]);
            this.dice[1].setCurrentPlayer(currentPlayer);
            this.dice[1].setValue(currentPlayer.diceObject[1]);
            return true;
    }
    
    return false;
};



DiceController.prototype.consumeDie = function(uniqueId){
    for (var i = 0; i < this.dice.length; ++i){
        if (this.dice[i].uniqueId == uniqueId){
            this.dice[i].played();
            return true;
        }
    }
    return false;
};

DiceController.prototype.setDiceUniqueId = function(uniqueIds){
   for (var i = 0; i < uniqueIds.length; ++i){
       this.dice[i].uniqueId = uniqueIds[i];
   }
};

DiceController.prototype.selectDieById = function(uniqueId){
    for (var i = 0; i < this.dice.length; ++i){
        if (this.dice[i].uniqueId == uniqueId){
            this.dice[i].select();
            return true;
        }
    }
    return false;
};

DiceController.prototype.unSelectDieById = function(uniqueId){
    for (var i = 0; i < this.dice.length; ++i){
        if (this.dice[i].uniqueId == uniqueId){
            this.dice[i].unSelect();
            return true;
        }
    }
    return false;
};

DiceController.prototype.selectDie = function(die){
    for (var i = 0; i < this.dice.length; ++i){
        if (this.dice[i].value() == dice){
            this.dice[i].select();
            return true;
        }
    }
    return false;
};

DiceController.prototype.consumeDice = function(){
    for (var i = 0; i < this.dice.length; ++i){
        this.dice[i].played();
    }
};

DiceController.prototype.getSelectedDieValue = function(){
    var value = [];
    var diceOne = 0;
    var diceTwo = 0;
    
    if (this.dice[0].selected()){
        diceOne = this.dice[0].value();
    }
    
    if (this.dice[1].selected()){
        diceTwo = this.dice[1].value();
    }
    
    value.push( { d1: diceOne, d2: diceTwo });
    return value;
};

DiceController.prototype.unSelectUnplayedDie = function(){
    for (var i = 0; i < this.dice.length; ++i){
        if (!this.dice[i].isSpent()){
            this.dice[i].unSelect();
        }
    }
};

DiceController.prototype.getUuid = function(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
};

