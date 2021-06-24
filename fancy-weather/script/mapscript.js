
mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVpcGF2bG92IiwiYSI6ImNrcHh0eTUyZTE5eXAybm56a3RkMHJ0ZnYifQ.O7Rn40S-8rhMTBOVrqH8Dg';

const time = document.getElementById('time'),
      refreshBtn = document.getElementById('refresh');    
let city = '',
    region = Intl.DateTimeFormat().resolvedOptions().timeZone,
    day = new Date();


async function getLinkToImage() {
    const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
    const res = await fetch(url);
    const data = await res.json();
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgb(0, 0, 0)), url(${data.urls.regular})`;
};
  
const setHtml = (data) =>{
    const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/streets-v11', 
        center: [data.location.lon, data.location.lat], // [lng, lat]
        zoom: 9 
        });
    let date = data.location.localtime;
    document.getElementById('date').textContent = date.substring(0, 10);
    
    document.getElementById('icon').src = data.current.condition.icon;
    document.getElementById('iconFirst').src = data.forecast.forecastday[1].day.condition.icon;
    document.getElementById('iconSecond').src = data.forecast.forecastday[2].day.condition.icon;
    document.getElementById('iconThird').src = data.forecast.forecastday[2].day.condition.icon;
    
    document.querySelector('.temperature').textContent = data.current.temp_c;
    document.querySelector('.weather_town').textContent = data.location.name + ',';
    document.querySelector('.weather_country').textContent = data.location.country;

    document.querySelector('.date_first').textContent = data.forecast.forecastday[1].date;
    document.querySelector('.date_second').textContent = data.forecast.forecastday[2].date;
    document.querySelector('.date_third').textContent = data.forecast.forecastday[2].date;

    document.querySelector('.temperature_first').textContent = data.forecast.forecastday[1].day.maxtemp_c;
    document.querySelector('.temperature_second').textContent = data.forecast.forecastday[2].day.maxtemp_c;
    document.querySelector('.temperature_third').textContent = data.forecast.forecastday[2].day.maxtemp_c;

    document.querySelector('.condition').textContent = data.current.condition.text;
    document.querySelector('.condition_first').textContent = data.forecast.forecastday[1].day.condition.text;
    document.querySelector('.condition_second').textContent = data.forecast.forecastday[2].day.condition.text;
    document.querySelector('.condition_third').textContent = data.forecast.forecastday[2].day.condition.text;

    document.querySelector('.btn_f').addEventListener('click', ()=>{
    document.querySelector('.temperature').textContent = data.current.temp_f;
    document.querySelector('.temperature_first').textContent = data.forecast.forecastday[1].day.maxtemp_f;
    document.querySelector('.temperature_second').textContent = data.forecast.forecastday[2].day.maxtemp_f;
    document.querySelector('.temperature_third').textContent = data.forecast.forecastday[2].day.maxtemp_f;
        let fahrenheit = document.querySelectorAll('.f');
        for(let i of fahrenheit){
            i.style.display = 'inline';
        }
        let celsius = document.querySelectorAll('.c');
        for(let i of celsius){
            i.style.display = 'none';
        }
    })
    
    document.querySelector('.btn_c').addEventListener('click', ()=>{
        document.querySelector('.temperature').textContent = data.current.temp_c;
        document.querySelector('.temperature_first').textContent = data.forecast.forecastday[1].day.maxtemp_c;
        document.querySelector('.temperature_second').textContent = data.forecast.forecastday[2].day.maxtemp_c;
        document.querySelector('.temperature_third').textContent = data.forecast.forecastday[2].day.maxtemp_c;
        let fahrenheit = document.querySelectorAll('.f');
        for(let i of fahrenheit){
            i.style.display = 'none';
        }
        let celsius = document.querySelectorAll('.c');
        for(let i of celsius){
            i.style.display = 'inline';
        }
    })
}

function getTodayDay(day){  
    const days = ['ВСSUND', 'ПНMOPN', 'ВТTUWT', 'СРWESR', 'ЧТTHCZ', 'ПТFRPT', 'СБSAŚB', 'ВСSUND', 'ПНMOPN', 'ВТTUWT'],
    todayRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота','Воскресенье', 'Понедельник', 'Вторник',],
    todayEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday',],
    todayPl = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela', 'Poniedziałek', 'Wtorek'];

    let res = day.getDay()

    document.querySelector('.weather_day').textContent = todayEn[res];
    document.querySelector('.weather_day_first').textContent = days[res + 1].substring(2,4);
    document.querySelector('.weather_day_second').textContent = days[res + 2].substring(2,4);
    document.querySelector('.weather_day_third').textContent = days[res + 3].substring(2,4);
        
    document.querySelector('.btn_en').addEventListener('click', ()=>{
        document.querySelector('.weather_day').textContent = todayEn[res];
        document.querySelector('.weather_day_first').textContent = days[res + 1].substring(2,4);
        document.querySelector('.weather_day_second').textContent = days[res + 2].substring(2,4);
        document.querySelector('.weather_day_third').textContent = days[res + 3].substring(2,4);
        });
    document.querySelector('.btn_ru').addEventListener('click', ()=>{
        document.querySelector('.weather_day').textContent = todayRu[day.getDay()];
        document.querySelector('.weather_day_first').textContent = days[res + 1].substring(0,2);
        document.querySelector('.weather_day_second').textContent = days[res + 2].substring(0,2);
        document.querySelector('.weather_day_third').textContent = days[res + 3].substring(0,2);
        });
    document.querySelector('.btn_pl').addEventListener('click', ()=>{
        document.querySelector('.weather_day').textContent = todayPl[res];
        document.querySelector('.weather_day_first').textContent = days[res + 1].substring(4,6);
        document.querySelector('.weather_day_second').textContent = days[res + 2].substring(4,6);
        document.querySelector('.weather_day_third').textContent = days[res + 3].substring(4,6);
        });            
}  
  
const setLocation = (data) => {
   let lat = document.querySelectorAll('.latitude_set');
   for(let i of lat){
       i.textContent = data.location.lat;
   }
   let lng = document.querySelectorAll('.longitude_set');
   for(let i of lng){
        i.textContent = data.location.lon;
   }
}

const fetchWeather = (city, lang) =>{
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=38b17556145940d3a90125437211106&q=${city}&days=8&aqi=no&alerts=no&lang=${lang}`)
    .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setHtml(data); 
                setLocation(data);
                region = data.location.tz_id;
            })
}

function fetchInitialData() {
    fetch("https://ipinfo.io/json?token=89065af18111da").then((res)=>{
        return res.json();
    }).then((townInfo)=>{
        city = townInfo.city;
        fetchWeather(city);
        document.getElementById('en').addEventListener('click', ()=>{
            fetchWeather(city, '');
            document.querySelector('.lat_eng').style.display = 'block';
            document.querySelector('.lat_rus').style.display = 'none';
            document.querySelector('.lat_pl').style.display = 'none';
        });
        document.getElementById('ru').addEventListener('click', ()=>{
            fetchWeather(city, 'ru');
            document.querySelector('.lat_rus').style.display = 'block';
            document.querySelector('.lat_eng').style.display = 'none';
            document.querySelector('.lat_pl').style.display = 'none';
        });
        document.getElementById('pl').addEventListener('click', ()=>{
            fetchWeather(city, 'pl');
            document.querySelector('.lat_pl').style.display = 'block';
            document.querySelector('.lat_rus').style.display = 'none';
            document.querySelector('.lat_eng').style.display = 'none';
        });
    })
};

const getTown = (e) =>{
    e.preventDefault();
    city = e.target[0].value;
    fetchWeather(city); 
}

setInterval(()=>{
    let timeZoneArea = new Date().toLocaleString('en-Us',{timeZone: region, hour12: false});
    time.textContent = `${timeZoneArea.substring(11, timeZoneArea.length)}`;
}, 1000)

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form.search_panel').addEventListener('submit', getTown);
    refreshBtn.addEventListener('click', ()=> location.reload());
    fetchInitialData();
    getTodayDay(day);   
    getLinkToImage();
});
