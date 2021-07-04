const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit-btn');
const error = document.querySelector('.error-msg');
let long;
let lat;
window.addEventListener("load",()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api=`http://api.weatherapi.com/v1/forecast.json?key=9e5da15017df470fa3e125316211901&q=${lat},${long}`;

      fetch(api)
      .then(response=>{
        return response.json();
      })
      .then(data=>{
        console.log(data);
        document.querySelector('.degrees').textContent    = data.current.temp_c;
        document.querySelector('.location').textContent   = `${data.location.name}, ${data.location.region}`;
        document.querySelector('.condition').textContent  = `${data.current.condition.text}`;
        document.querySelector('.feels-like').textContent = `FEELS LIKE: ${data.current.feelslike_c}`;
        document.querySelector('.wind-mph').textContent   = `WIND: ${data.current.wind_mph} MPH`;
        document.querySelector('.humidity').textContent   = `HUMIDITY: ${data.current.humidity}`;
      });
    });
  }
});



form.addEventListener('submit', handleSubmit);
submitBtn.addEventListener('click', handleSubmit);


function handleSubmit(e) {
  e.preventDefault();
  fetchWeather();   
}

async function getWeatherData(location) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=9e5da15017df470fa3e125316211901&q=${location}`,
    {
      mode: 'cors',
    }
  );
  if (response.status === 400) {
    throwErrorMsg();
  } else {
    error.style.display = 'none';
    const weatherData = await response.json();
    const newData = processData(weatherData);
    displayData(newData);
    reset();
  }
}

function throwErrorMsg() {
  error.style.display = 'block';
 
  error.textContent = "City not found!";
  setTimeout(()=>{
    if(error.textContent!="")
    {
      error.textContent="";
    }
  },1500);
  
}

function processData(weatherData) {
  // grab all the data i want to display on the page
  const myData = {
    condition: weatherData.current.condition.text,
    feelsLike: {
      f: Math.round(weatherData.current.feelslike_f),
      c: Math.round(weatherData.current.feelslike_c),
    },
    currentTemp: {
      f: Math.round(weatherData.current.temp_f),
      c: Math.round(weatherData.current.temp_c),
    },
    wind: Math.round(weatherData.current.wind_mph),
    humidity: weatherData.current.humidity,
    location: weatherData.location.name.toUpperCase(),
  };


    myData['region'] = weatherData.location.country.toUpperCase();
  

  return myData;
}

function displayData(newData) {
  const weatherInfo = document.getElementsByClassName('info');
  Array.from(weatherInfo).forEach((div) => {
    if (div.classList.contains('fade-in2')) {
      div.classList.remove('fade-in2');
      
      div.classList.add('fade-in2');
    } else {
      div.classList.add('fade-in2');
    }
  });
  document.querySelector('.condition').textContent = newData.condition;
  document.querySelector('.location').textContent = `${newData.location}, ${newData.region}`;
  document.querySelector('.degrees').textContent = newData.currentTemp.c;
  document.querySelector('.feels-like').textContent = `FEELS LIKE: ${newData.feelsLike.c}`;
  document.querySelector('.wind-mph').textContent = `WIND: ${newData.wind} MPH`;
  document.querySelector('.humidity').textContent = `HUMIDITY: ${newData.humidity}`;
}

function reset() {
  form.reset();
}

// get location from user
function fetchWeather() {
  const input = document.querySelector('input[type="text"]');
  const userLocation = input.value;
  getWeatherData(userLocation);
}
// --------------------------------------------------------------------------------------------
const endpoint = 'https://raw.githubusercontent.com/nshntarora/Indian-Cities-JSON/master/cities.json';

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const cities = [];
fetch(endpoint)
.then(blob=>{
    return blob.json();
})
.then((data)=>{
        cities.push(...data);
})

function findMatches(wordToMatch,cities){
    return cities.filter(place=>{
        const regex = new RegExp(wordToMatch,'gi')// g is for global, i is for insensitive
        return place.name.match(regex) || place.state.match(regex);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function displayMatches(){
    if(this.value=='')
    {
        suggestions.innerHTML = "";
        return;
    }
    
        const matchArray = findMatches(this.value,cities);  
        const html = matchArray.map(place=>{
            
            const regex = new RegExp(this.value,'gi');
            const cityName = place.name.replace(regex,`<span class="hl">${this.value}</span>`);
            const stateName = place.state.replace(regex,`<span class="hl">${this.value}</span>`);
            return `<li class="ok">
                        <span class="name"><span><span class="in">${cityName}</span>, ${stateName}</span>
                        
                    </li>`;
                    
        }).join('');
        suggestions.innerHTML = html;
    

    const li = document.querySelectorAll("li");
    li.forEach(element => {
        element.addEventListener("click",()=>{
            const span = element.querySelector("span");
            const ins = span.querySelector(".in");
            this.value = ins.textContent;
            this.style.fontSize = `20px`;
            // this.style.textAlign = `center`;
            suggestions.innerHTML="";
        })
        
    });
    
}


searchInput.addEventListener("keyup",displayMatches);