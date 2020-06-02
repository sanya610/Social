var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");

var operator = null;
var operand1 = 0;
var operand2 = null;
var ans = 0;

for(var i=0;i<buttons.length;i++)
{
 buttons[i].addEventListener('click',function(){
   
   var value = this.getAttribute('value'); 
   
   
   if(value == "+" || value == "-" || value == "*" || value == "/" || value == '%') 
   {
    operator = value;
    
    operand1 = parseFloat(display.textContent);
    ans = operand1 + " " + operator;

    display.innerText = " ";
   }
   
   else if(value == '=')
   {
    operand2 = parseFloat(display.textContent);
 
    var result = eval(ans + " " + operand2);
      
    display.innerText = result;
   }
 
   else if(value=='AC')
   {
    var operator = null;
    var operand1 = 0;
    var operand2 = null;
    display.innerText = " ";  
   }

   else if(value=='backspace')
   {
    console.log(value); 
    var string = display.textContent;
    var len =  string.length;
    string = string.substr(0,len-1);
    console.log(string);
    display.innerText = string;
   } 

   else
   {
    display.innerText += value;
   } 

 });   
}

