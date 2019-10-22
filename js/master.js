class Calculator{
  constructor(prevNumber,currentNumber,operation,msgBlock){
    this.result="";
    this.firstNumber=0;
    this.currentOperation="";
    this.operationBlock=operation;
    this.msgBlock=msgBlock;
    this.prevBlock=prevNumber;
    this.currentBlock=currentNumber;
    this.currentBlock.innerHTML=0;
  }

  resetAll(){
    this.result="";
    this.firstNumber=0;
    this.currentOperation="";
    this.currentBlock.innerHTML=0;
    this.operationBlock.innerHTML="";
    this.prevBlock.innerHTML="";
  }

  handleInput(value){
    let ascii= value.charCodeAt(0);
    if(value =="AC"){
      this.resetAll();
      return;
    }
    let valid_buttons=[42,43,45,46,47,61];
    if(ascii == 69 || ascii ==32){
      ascii=61;
      value="=";
    }
    if(ascii<=57 && ascii >=48){
      this.handleNumber(value);
    }else{
      let valid=valid_buttons.some(function(valid){
        return ascii==valid
      })
      if(valid){
        this.handleSymbol(value);
      }
    }
  }

  handleNumber(num){
  	this.result=this.result+num;
    this.currentBlock.innerHTML=this.result;
  }

  carryOperation(){
    let secondNum=parseFloat(this.result);
    switch (this.currentOperation) {
      case "+":
        this.firstNumber+=secondNum;
        break;
      case "-":
        this.firstNumber-=secondNum;
        break;
      case "*":
        this.firstNumber=this.firstNumber*secondNum;
        break;
      case "/":
        if(secondNum==0){
          this.msgBlock.style.display="block";
          return;
        }
        this.firstNumber=this.firstNumber/secondNum;
        break;
    }
  }

  handleSymbol(sym){

    //handle extra buttons
    if(sym=="C"){
      this.result="";
      this.currentBlock.innerHTML="";
      return;
    }else if(sym=="="){
      if(this.currentOperation!=""){
        this.carryOperation();
        this.currentBlock.innerHTML=this.firstNumber;
        this.currentOperation="";
        this.result=this.firstNumber;
        this.operationBlock.innerHTML="";
        this.prevBlock.innerHTML="";
        this.firstNumber=0;
      }
      return;
    }else if(sym=="."){
      if(!this.result.includes(".")){
        this.result+=".";
        this.currentBlock.innerHTML+=".";
        }
      return;
    }

    if(sym=="-" && this.firstNumber==0 && this.result==""){
      this.result+="-";
      this.currentBlock.innerHTML="-";
      return;
    }else if(this.firstNumber==0 && (this.result=="" || this.result=="-") ){
      return;
    }

    //handle arithmetic buttons
    if(this.firstNumber==0){
      this.firstNumber=parseFloat(this.result)
      this.prevBlock.innerHTML=this.result;
      this.result="";
      this.currentBlock.innerHTML="";
      this.operationBlock.innerHTML=sym;
      this.currentOperation=sym;
    }else if(this.result==""){
      this.currentOperation=sym;
      this.operationBlock.innerHTML=sym;
    }else{
      this.carryOperation();
      this.currentOperation=sym;
      this.operationBlock.innerHTML=sym;
      this.result="";
      this.prevBlock.innerHTML=this.firstNumber;
      this.currentBlock.innerHTML="";
    }
  }
}

var prevNumber=document.getElementById("prevNumber");
var currentNumber=document.getElementById("currentNumber");
var operation=document.getElementById("operation");
var msgBlock=document.getElementById("msgBlock");
msgBlock.style.display="none";

var calc= new Calculator(prevNumber,currentNumber,operation,msgBlock);

window.addEventListener("keydown",function(e){

  msgBlock.style.display="none";
  calc.handleInput(e.key);
})

window.addEventListener("click",function(e){
  let value=e.target.innerHTML;

  msgBlock.style.display="none";
  if(value){
    calc.handleInput(value);
  }
})
