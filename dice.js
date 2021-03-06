const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

const blank = 'blank';
const triumph = 'triumph';
const succ = 'success';
const despair = 'despair';
const fail = 'failure';
const adv = 'advantage';
const dis = 'threat';

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

module.exports.determineSuccess = function(yellow, green, red, purple, advantage, threat) {
    let successCounter = 0;
    let failCounter = 0;
    let advantageCounter = 0;
    let threatCounter = 0;
    let triumphState = false;
    let despairState = false;
    let output = '';

    function readResults(diceArr) {
        diceArr.forEach(e => {
            switch(e) {
                case blank:
                    break;
                case triumph:
                    triumphState = true;
                    successCounter++;
                    break;
                case succ:
                    successCounter++;
                    break;
                case despair:
                    despairState = true;
                    failCounter++;
                    break;
                case fail:
                    failCounter++;
                    break;
                case adv:
                    advantageCounter++;
                    break;
                case dis:
                    threatCounter++;
                    break;
            };
        });
    };

    function correctPlural(str) {
        if (str == succ) {
            if (successCounter === 1) return 'success'
            else return 'successes';
        };
        if (str == fail) {
            if (failCounter === 1) return 'failure'
            else return 'failures';
        };
    };

    readResults(yellowDice(yellow));
    readResults(greenDice(green));
    readResults(redDice(red));
    readResults(purpleDice(purple));
    readResults(advDice(advantage));
    readResults(disDice(threat));

    if (successCounter > failCounter) {
        output += 'SUCCESS - ';
    } else output += 'FAILURE - ';

    if (advantageCounter > threatCounter) {
        output += 'with ADVANTAGE';
    } else if (advantageCounter < threatCounter) {
        output += 'with THREAT';
    } else output += 'NEUTRAL';

    if (triumphState) {
        output += ' and TRIUMPH';
    }; 
    
    if (despairState) {
        output += ' and DESPAIR';
    };
    return `${output}! You got ${successCounter} ${correctPlural(succ)}, ${failCounter} ${correctPlural(fail)}, ${advantageCounter} advantage and ${threatCounter} threat.`;
  };

module.exports.forceOutput = function(force) {
   let forceValues = forceDice(force);
   let light = forceValues[0];
   let dark = forceValues[1];

   function correctPlural(str, side) {
       if (str == 'are' && side == 'light') {
           if(light === 1) return 'is'
           else return 'are';
       };
       if (str == 'points' && side == 'light') {
        if(light === 1) return 'point'
        else return 'points';
       };
       if (str == 'are' && side == 'dark') {
        if(dark === 1) return 'is'
        else return 'are';
       };
       if (str == 'points' && side == 'dark') {
        if(dark === 1) return 'point'
        else return 'points';
       };
       if (str == 'dice') {
         if(force == 1) return 'die'
         else return 'dice';
       };               
    };

   return `From ${force} force ${correctPlural('dice', '')} there ${correctPlural('are', 'light')} ${light} light side ${correctPlural('points', 'light')} and ${dark} dark side ${correctPlural('points', 'dark')}.`
};

function yellowDice(num) {
 let diceArr = [];
    for (let i = 0; i < num; i++) {
        let rand = randomInt(0,11);
        switch(rand) {
            case 0:
                diceArr.push(blank);
                break;
            case 1:
                diceArr.push(succ);
                break;
            case 2:
                diceArr.push(succ);
                break;
            case 3:
                diceArr.push(succ, succ);
                break;
            case 4:
                diceArr.push(succ, succ);
                break;
            case 5:
                diceArr.push(adv);
                break;
            case 6:
                diceArr.push(adv, succ);
                break;
            case 7:
                diceArr.push(adv, succ);
                break;
            case 8:
                diceArr.push(adv, succ);
                break;
            case 9:
                diceArr.push(adv, adv);
                break;
            case 10:
                diceArr.push(adv, adv);
                break;
            case 11:
                diceArr.push(triumph);
                break;                                                                                  
        };
    };
    return diceArr;
};

function redDice(num) {
    let diceArr = [];
       for (let i = 0; i < num; i++) {
           let rand = randomInt(0,11);
           switch(rand) {
               case 0:
                   diceArr.push(blank);
                   break;
               case 1:
                   diceArr.push(fail);
                   break;
               case 2:
                   diceArr.push(fail);
                   break;
               case 3:
                   diceArr.push(fail, fail);
                   break;
               case 4:
                   diceArr.push(fail, fail);
                   break;
               case 5:
                   diceArr.push(dis);
                   break;
               case 6:
                   diceArr.push(dis, fail);
                   break;
               case 7:
                   diceArr.push(dis, fail);
                   break;
               case 8:
                   diceArr.push(dis, fail);
                   break;
               case 9:
                   diceArr.push(dis, adv);
                   break;
               case 10:
                   diceArr.push(dis, adv);
                   break;
               case 11:
                   diceArr.push(despair);
                   break;                                                                                  
           };
       };
       return diceArr;
};

function greenDice(num) {
    let diceArr = [];
       for (let i = 0; i < num; i++) {
           let rand = randomInt(0,7);
           switch(rand) {
               case 0:
                   diceArr.push(blank);
                   break;
               case 1:
                   diceArr.push(succ);
                   break;
               case 2:
                   diceArr.push(succ);
                   break;
               case 3:
                   diceArr.push(succ, succ);
                   break;
               case 4:
                   diceArr.push(adv);
                   break;
               case 5:
                   diceArr.push(adv);
                   break;
               case 6:
                   diceArr.push(adv, succ);
                   break;
               case 7:
                   diceArr.push(adv, adv);
                   break;
           };
        };
        return diceArr;    
};

function purpleDice(num) {
    let diceArr = [];
       for (let i = 0; i < num; i++) {
           let rand = randomInt(0,7);
           switch(rand) {
               case 0:
                   diceArr.push(blank);
                   break;
               case 1:
                   diceArr.push(fail);
                   break;
               case 2:
                   diceArr.push(fail);
                   break;
               case 3:
                   diceArr.push(fail, fail);
                   break;
               case 4:
                   diceArr.push(dis);
                   break;
               case 5:
                   diceArr.push(dis);
                   break;
               case 6:
                   diceArr.push(dis, fail);
                   break;
               case 7:
                   diceArr.push(dis, dis);
                   break;
           };
        };
        return diceArr;    
};

function advDice(num) {
    let diceArr = [];
       for (let i = 0; i < num; i++) {
           let rand = randomInt(0,5);
           switch(rand) {
               case 0:
                   diceArr.push(blank);
                   break;
               case 1:
                   diceArr.push(blank);
                   break;
               case 2:
                   diceArr.push(succ);
                   break;
               case 3:
                   diceArr.push(adv, succ);
                   break;
               case 4:
                   diceArr.push(adv, adv);
                   break;
               case 5:
                   diceArr.push(adv);
                   break;
           };
        };
        return diceArr;    
};

function disDice(num) {
    let diceArr = [];
       for (let i = 0; i < num; i++) {
           let rand = randomInt(0,5);
           switch(rand) {
               case 0:
                   diceArr.push(blank);
                   break;
               case 1:
                   diceArr.push(blank);
                   break;
               case 2:
                   diceArr.push(fail);
                   break;
               case 3:
                   diceArr.push(dis, fail);
                   break;
               case 4:
                   diceArr.push(dis, dis);
                   break;
               case 5:
                   diceArr.push(dis);
                   break;
           };
        };
        return diceArr;    
};

function forceDice(num) {
    let lightValue = 0;
    let darkValue = 0;

    for (let i = 0; i < num; i++) {
        let rand = randomInt(0,11);
        switch(rand) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                darkValue++;
                break;
            case 6:
                darkValue+= 2;
                break;
            case 7:
            case 8:
                lightValue++;
                break;
            case 9:
            case 10:
            case 11:
                lightValue+= 2;
                break;                                                                                  
        };
    };

    return [lightValue, darkValue];
};