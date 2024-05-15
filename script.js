const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const API_KEY = 'b2c71655b1793a73461eea028db546ab';

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >=13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM'

  timeEl.innerHTML = hoursIn12HrFormat + ':' + minutes+ ' ' + `<span id="am-pm">${ampm}</span>`
  

  dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&exclude=hourly,minutely
        `).then(res => res.json()).then(data => {
         
        console.log(data)
        showWeatherData(data);

        })
    })
}

function showWeatherData(data) {
  
    let {humidity, pressure, temp_max, temp_min, feels_like} = data.main, {sunrise, sunset} = data.sys;
    
    
    currentWeatherItemsEl.innerHTML = 
      `<div class="weather-item">
          <div>Humidity</div>
          <div>${humidity}%</div>
        </div>
        <div class="weather-item">
          <div>Pressure</div>
          <div>${pressure}</div>
        </div>
        
        <div class="weather-item">
          <div>Sunrise</div>
          <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
          <div>Sunset</div>
          <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
        </div>

        <div class="weather-item">
          <div>Day</div>
          <div>${temp_max}&#176; C</div>
        </div>
        <div class="weather-item">
          <div>Night</div>
          <div>${temp_min}&#176; C</div>
        </div>
        <div class="weather-item">
          <div>Feels Like</div>
          <div>${feels_like}&#176; C</div>
        </div>
        
        `;

        let otherDayForcast = ''
        data.forEach((day, idx) => {
          if(idx==0){

          }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.coord.dt * 1000).format('ddd')}</div>
                <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon" />
                <div class="temp">Night - ${day.main.temp_min}&#176; C</div>
                <div class="temp">Day - ${day.main.temp_max}&#176; C</div>
              </div>
            `
          }
        })
        weatherForecastEl.innerHTML = otherDayForcast;
      }
  

