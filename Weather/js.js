let city=document.querySelector(".bar1 input");
//"https://api.openweathermap.org/data/2.5/weather?q=chandigarh&units=metric&lang=en&appid=59bc4b3eaaf2ac8eb417f55b46cdaf3f"
let nam=document.querySelector(".location h3");
let feel1=document.querySelector(".location p");
let tem=document.querySelector(".b21 h2");
let ic=document.querySelector(".bar2 img");

//air conditions

let feel2=document.querySelector(".a12");
let speed=document.querySelector(".a22");
let humidity=document.querySelector(".a32");
let pressure=document.querySelector(".a42");

//hourly forecast
let today=document.querySelector(".today");

let date="";

// days forecast

let seven=document.querySelector(".sevencontainer");

// °F 



city.addEventListener("keydown",async(e)=>{
  if(e.key==="Enter"){
    let cityname=city.value;

    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&lang=en&appid=59bc4b3eaaf2ac8eb417f55b46cdaf3f`;

    let response= await fetch(URL);
    let data= await response.json();
    
    if(data.cod==="404"){
      alert("Enter Correct City");
    }
    else{
    nam.innerHTML=data.name;
    city.value="";
    tem.innerHTML=`${data.main.temp}°`;
    ic.src=`${data.weather[0].icon}.png`;
    
    feel1.innerHTML=`Feels like: ${data.main.feels_like}°`;
    feel2.innerHTML=`${data.main.feels_like}°`
    speed.innerHTML=data.wind.speed;
    humidity.innerHTML=data.main.humidity;
    pressure.innerHTML=data.main.pressure;
    }

    // hourly forecast

    const link=`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&units=metric&appid=59bc4b3eaaf2ac8eb417f55b46cdaf3f`

    let response2= await fetch(link);
    let data2= await response2.json();

    today.innerHTML="";

    data2.list.forEach((v,i) => {
      if (i<6){
        //console.log(i,v);
        let time=data2.list[i].dt;
        let timezone = data2.city.timezone;  // The timezone from the API response
        let localTime = moment.unix(time).utcOffset(timezone / 60).format('HH:mm');

        let ftemp=data2.list[i].main.temp;
        let ficon=data2.list[i].weather[0].icon;

        today.innerHTML+=`<div class="t${i+1}">
        <p class="b${i+1}1">${localTime}</p>
        <img src="${ficon}.png" alt="icon">
        <p class="b${i+1}2">${ftemp}°</p>
      </div>`
      }
    })

      //second half

      seven.innerHTML="";
      let n=1
      
      for (let i = 0; i < 40; i += 8) {


        if(i===0){
          date="Today";
        }
        else{
          let time=data2.list[i].dt;
          let timezone = data2.city.timezone;  // The timezone from the API response
          date = moment.unix(time).utcOffset(timezone / 60).format('dddd');
        }
      
        let description=data2.list[i].weather[0].description;
        let sicon=data2.list[i].weather[0].icon;
        let min=data2.list[i].main.temp_min;
        let max=data2.list[i].main.temp_max;

        seven.innerHTML+=`<div class="d${n}">
        <p class="day${n}">${date}</p>
        <div class="f${n}">
          <img src="${sicon}.png">
          <p>${description}</p>
        </div>
        <p class="tmax${n}">${max}/${min}</p>
      </div>`;

      n+=1;

    }  
  };
})




