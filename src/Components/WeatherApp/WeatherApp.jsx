import React from 'react'
import './WeatherApp.css'


import cloud_cover from "../Assets/cloud-cover.png";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";

export const WeatherApp = () => {
    /* api key needed in line below */
    let api_key = "";

    const search = async () => {
        const element = document.getElementsByClassName("location")
        if(element[0].value==="")
        {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let url2 = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        let response2 = await fetch(url2)
        let data2 = await response2.json()

        const divTableCell = document.getElementsByClassName("divTableCell")
        const cloud_cover = document.getElementsByClassName("cloud-cover")
        const sunset = document.getElementsByClassName("sunset")
        const temperature = document.getElementsByClassName("weather-temp")
        const city = document.getElementsByClassName("weather-location")
        const min = document.getElementsByClassName("min-temp")
        const max = document.getElementsByClassName("max-temp")
        const status = document.getElementsByClassName("weather-status")

        status[0].innerHTML = data.weather[0].description;
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°";
        city[0].innerHTML = data.name;
        min[0].innerHTML = "min: " + Math.floor(data.main.temp_min) +"°";
        max[0].innerHTML = "max: " + Math.floor(data.main.temp_max) +"°";
        cloud_cover[0].innerHTML = data.clouds.all + "%";

        var utcSeconds = data.sys.sunset;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        d.getTime()
        
        const hrs = String(d.getHours()).padStart(2, '0');
        const mins = String(d.getMinutes()).padStart(2, '0');
        sunset[0].innerHTML = hrs + ":" + mins
        
        for(let i=0; i<5; i++) {
            utcSeconds = data2.list[i].dt
            d = new Date(0)
            d.setUTCSeconds(utcSeconds);
            d.getTime()
            divTableCell[i].innerHTML = String(d.getHours()).padStart(2, '0');
        }
        /* i-10 is because the index is for the table cell and we want the temperature at the current time not the current time +10 */
        for(let i=10; i<15; i++) {
            divTableCell[i].innerHTML = Math.floor(data2.list[i-10].main.temp) +"°";

        }
        
        
        
      }
  return (
    <div className='container'>
        <div className="search-bar">
            <input type="text" className='location' placeholder='Search'/>
            <div className="search-icon" onClick={()=>{search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-location">Istanbul</div>
        <div className="weather-temp">19°</div>
        <div className="weather-status">Clear Sky</div>
        <div className="weather-range">
            <div className="max-temp"> Max: 24° </div>
            <div className="min-temp"> Min: 8° </div>
        </div>
        <div className="data-container">
            <div className="element">
                <h5>Hourly Forecast <br /></h5>
                <div class="divTable">
                    <div class="divTableBody">
                        <div class="divTableRow">
                            <div class="divTableCell">now</div>
                            <div class="divTableCell">23</div> 
                            <div class="divTableCell">00</div>
                            <div class="divTableCell">01</div>
                            <div class="divTableCell">02&nbsp;</div>
                        </div>
                        <div class="divTableRow">
                            <div class="divTableCell">&nbsp;</div>
                            <div class="divTableCell">&nbsp;</div>
                            <div class="divTableCell">&nbsp;</div>
                            <div class="divTableCell">&nbsp;</div>
                            <div class="divTableCell">&nbsp;</div>
                        </div>
                        <div class="divTableRow">
                            <div class="divTableCell">&nbsp;8</div>
                            <div class="divTableCell">8</div>
                            <div class="divTableCell">9</div>
                            <div class="divTableCell">9</div>
                            <div class="divTableCell">9</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="data-container">
            <div className="element">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/bf1bef42aa3b43fde3f2c541be4889c42cbaeca65e079ddf8abb2f1c63244e1e?apiKey=f3548c2a5b0a43929c18ec761a37ebba&" alt="" className='icon'/>
                <div className="data">
                    <div className="cloud-cover">78%</div>
                    <div className="text">Cloud Cover</div>
                </div>
            </div>
            <div className="element">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/355df1dfb435044c353f1ca01675b0486b5e52ee6ee0d5a3eab1e4f07cff9d20?apiKey=ecf391057e4b4a85bab48c61531d4ba3&" alt="" className='icon'/>
                <div className="data">
                    <div className="sunset">10:28 PM</div>
                    <div className="text">Sunset</div>
                </div>
            </div>
        </div>
    </div>
  )
}
