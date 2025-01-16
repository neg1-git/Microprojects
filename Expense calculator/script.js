enterButt=document.querySelector(".ent");
let arr=[];
let listing= document.querySelector(".listing");
let id=0;

let nam=document.querySelector(".nameInp");
let amt=document.querySelector(".amountInp");
let cat=document.querySelector(".categoryInp");

let totExp=0;

let addButt=document.querySelector(".addButt");

let balance=document.querySelector(".balance");
let expenses=document.querySelector(".expenses");

console.log(typeof income);

enterButt.addEventListener("click",(evt)=>{
  evt.preventDefault();
  let input=document.querySelector(".income");
  let income=Number(input.value);

  let newBal= income - Number(expenses.innerHTML);
  balance.innerHTML=newBal;
})


function add(){
  let name=nam.value.trim();
  let amount=amt.value.trim();
  let category=cat.value.trim();

  if(name===""||category===""||amount<=0){
  if(name===""){
    alert("Give a Name");
  }
  if(category===""){
    alert("Give a Category");
  }
  if(amount<=0){
    alert("Give a Suitable Amount");
  }}

  else{
    const newObj={
      id:arr.length,
      n:name,
      a:amount,
      c:category,
    };
    arr.push(newObj);
    console.log(arr);
    obj= arr[arr.length-1];
    let newCode=`<div><p>${obj.n}</p><p>${obj.a}</p><p>${obj.c}</p><button class="xbutt" id="${newObj.id}">X</button></div>`;

    listing.innerHTML+=newCode;
    console.log(listing.innerHTML);

    totExp+=Number(obj.a);
    expenses.innerHTML=totExp;
  }}

listing.addEventListener("click",(e)=>{
  e.preventDefault();
    if(e.target.classList.contains("xbutt")){
    let delId=Number(e.target.id);
    arr = arr.filter(item => item.id !== delId);
    listing.innerHTML = "";
    let tot=0;

    arr.forEach((obj) => {
      const newCode = `<div>
                         <p>${obj.n}</p>
                         <p>${obj.a}</p>
                         <p>${obj.c}</p>
                         <button class="xbutt" id="${obj.id}">X</button>
                       </div>`;
      listing.innerHTML += newCode;

      tot+=obj.a;
    });
    expenses.innerHTML=Number(tot); 
  }
});

addButt.addEventListener("click",(e)=>{
  e.preventDefault();
  add();
})


let clButt=document.querySelector(".clearAll");

clButt.addEventListener("click",(e)=>{
  e.preventDefault();
  arr=[];
  listing.innerHTML="";
  expenses.innerHTML=Number(0);
})