/***************************backend controller *****************************/
let backendController =(function(){
          /*********WIN TRIGGER FUNCTION***********/
  let winStatement = (sign,position) => {
    if(sign === "O"){document.querySelector("h1").style.color = "red";}
    else {document.querySelector("h1").style.color = "navy";}
    document.querySelector("h1").textContent = `${sign} is the winner at ${position}`;
  }
  
  return{
    winningTest : function(tableCntnt){
      let sign;
      if(tableCntnt === -1){return false;}
      if (tableCntnt[0] != 0){
        sign = tableCntnt[0];
        if (tableCntnt[0]===tableCntnt[1] && tableCntnt[1]===tableCntnt[2]){
            winStatement(sign, "the top");
            return true;
          }
        else if (tableCntnt[0]===tableCntnt[3] && tableCntnt[3]===tableCntnt[6]){
            winStatement(sign, "the left");
            return true;
          }
        else if (tableCntnt[0]===tableCntnt[4] && tableCntnt[4]===tableCntnt[8]){
            winStatement(sign, "the right diag");
            return true;
          }
      }
      if (tableCntnt[3] != 0 && tableCntnt[3]===tableCntnt[4] && tableCntnt[4]===tableCntnt[5]){
        sign = tableCntnt[3];
        winStatement(sign, "the middle");
        return true;
      }
      if (tableCntnt[6] != 0){
        sign = tableCntnt[6];
        if (tableCntnt[6]===tableCntnt[7] && tableCntnt[7]===tableCntnt[8]){
            winStatement(sign, "the bottom");
            return true;
          }
        else if (tableCntnt[6]===tableCntnt[4] && tableCntnt[4]===tableCntnt[2]){
            winStatement(sign, "the left diag");
            return true;
          }
      }
      if (tableCntnt[1] != 0 && tableCntnt[1]===tableCntnt[4] && tableCntnt[4]===tableCntnt[7]){
        sign = tableCntnt[1];
        winStatement(sign, "the center");
        return true;
      }
      if (tableCntnt[2] != 0 && tableCntnt[2]===tableCntnt[5] && tableCntnt[5]===tableCntnt[8]){
        sign = tableCntnt[2];
        winStatement(sign, "the right");
        return true;
      }
      return false;
    }
  }
}());
/*************************User interface controller ******************************/
let UIController =(function(){
  let DOMStrings = {
    signSelect : '.X_or_O',
    gameTable : '.gameTable'
  };
  let tableContent = [0,0,0,0,0,0,0,0,0];
  return{
    
              // add sign to game table
    addsign : function (sign, itemID, playCounterX,playCounterO){
      let content;
      content = document.getElementById(itemID).textContent;
      if  (sign === "" || content !== ""){
        console.log("bumpin up");
        return -1;
      }
      else if (sign === "X" && playCounterX ===1){
        content = document.getElementById(itemID).textContent = "X";
        document.getElementById(itemID).style.color = "darkblue";
      }
      else if (sign === "O" && playCounterO ===1){
        content = document.getElementById(itemID).textContent = "O";
        document.getElementById(itemID).style.color = "red";
      }
      tableContent[itemID-1] = content;
      return tableContent;      
    },
    gameOver : function(win){
      if (win){
        let element = '<button class="replay" onClick = "window.location.reload();"><i class ="ion-ios-refresh-outline"></i></button>';
        document.querySelector("#X").remove();
        document.querySelector("#O").remove();
        document.querySelector(DOMStrings.signSelect).insertAdjacentHTML('beforeend',element);
      }
    },
              // return classes object
    UIClass: function(){
      return DOMStrings;
    }
  };
}());
/***************App controller **************/
let appController = (function(UIctrl, backendCtrl){
  let DOMY = UIctrl.UIClass();
  let signSelection = false;
  let signy,gameWon;
  let counterO = counterX = 0;
                      // *******Event listeners function*******
  let eventListeners = function(){
    document.querySelector(DOMY.gameTable).addEventListener("click", addSigns);
    document.querySelector(DOMY.signSelect).addEventListener("click", selectSign);
  }
                          //*********select sign************
  let playCount = 0;
  let selectSign = function(event){
    let itemID;
    itemID = event.target.id;
    if (!signSelection){
      if(itemID === "X") {signy = "X"; counterX++;counterO = 0;}
      else if(itemID === "O") {signy = "O"; counterO++;counterX = 0;}
      signSelection = true;
    }
  }
                           //********sign adder *************
  let addSigns = function(event){
    playCount++;
    let itemID, tableContent;
    itemID = event.target.id;
    tableContent = UIctrl.addsign(signy, itemID,counterX,counterO);
    if (tableContent !== -1){
      signy = "";
      signSelection = false;
    }
    if (playCount > 4){
        gameWon = backendCtrl.winningTest(tableContent);
        UIctrl.gameOver(gameWon);
        console.log(tableContent);
    }
    if(!tableContent.includes(0)){
      UIctrl.gameOver(true);
    }
  }
  
  return{
    init : function(){
      eventListeners();
    }
  }
}(UIController,backendController));

appController.init();