const dropdown= document.querySelectorAll("select");
const BASE_URL="https://api.frankfurter.app/latest?base="
//https://api.frankfurter.app/latest?base=USD&symbols=INR
const btn= document.querySelector("form button")
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");



for(let val of dropdown){ //isme for-in nahi lagra kyuki for in me val string hota hai aur humey options store krne k liye val as object chahiye jo ki val of dropdown me milta 
  for(let currCode in countryList){
    let newOption=document.createElement("option"); //isse hum pehle ek option element banayenge har loop ke working ke saath
    newOption.append(currCode); // isse jo naya option bana usme currcode bhar denge,,, newOption.innerText bhi kr sakte hain
    newOption.value=currCode; //isme har new option me corresponding values dedeni hai jo ki unki curr code hi hai

    val.append(newOption); //isme in new options ko ek ek krke hamey val me daal dena hai jo hi ek object hai select ka jo saare options store krta hai

    if(val.name==="from" && currCode==="USD") { //ye toh upar likho ya neeche same hi cheez karega
      newOption.selected="selected";
    }
    if(val.name==="to" && currCode==="INR") {
      newOption.selected="selected";
    }

  }
  val.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}

const updateFlag=(e) =>{
  let currCode=e.value;
  let countryCode=countryList[currCode];
  let img1= document.querySelector(".img1");
  let img2= document.querySelector(".img2");
  if(e.name==="from"){
    img1.src=`https://flagsapi.com/${countryCode}/flat/64.png`
  }
  else{
    img2.src=`https://flagsapi.com/${countryCode}/flat/64.png`
  }
};

btn.addEventListener("click",async(evt)=>{
  evt.preventDefault();
  let amt= document.querySelector("input");
  let amtVal=amt.value;
  if(amtVal<1){
    amtVal=1;
    amt.value=1;
  }
  const URL=`${BASE_URL}${fromCurr.value}&symbols=${toCurr.value}`;
  let response=await fetch(URL);
  let data= await response.json();
  let obj= data["rates"];
  let rate= obj[toCurr.value];
  let finalAmt= amtVal*rate;
  let newMsg=`${amtVal}${fromCurr.value}=${finalAmt}${toCurr.value}`;
  msg.innerHTML=newMsg;
  console.log(URL);

})