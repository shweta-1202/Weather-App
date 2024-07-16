import "./App.css";
import { useState, useEffect } from "react";
import search_icon from "./assets/search.png";
import rain_icon from "./assets/rain.png";
import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import snow_icon from "./assets/snow.png";
import wind_icon from "./assets/wind.png";
import humidity_icon from "./assets/humidity.png";


const getWeatherData = async (BASE_URL) => {
  let response = await fetch(BASE_URL);
  let data = await response.json();
  return data;
};

const getIcon = (data) => {
  switch (data.weather[0].main.toLowerCase()) {
    case "rain":
      return rain_icon;
    case "clear":
      return clear_icon;
    case "clouds":
      return cloud_icon;
    case "drizzle":
      return drizzle_icon;
    case "snow":
      return snow_icon;
    default:
      return clear_icon;
  }
};

function App() {
  const [location, setLocation] = useState("Mumbai");
  const [data, setData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(clear_icon);

  const API_KEY = "5d772de0a06a432dd1f93f7708e463cd";
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    getWeatherData(BASE_URL).then((data) => {
      setData(data);
      console.log(data);
      let icon = getIcon(data);
      setWeatherIcon(icon);
    });
  }, [location]);

  const handleSearch = () => {
    const input = document.getElementById("location-input");
    setLocation(input.value);
  };

  return (
    <div className="weather">Weather App
      <div className="search-bar">
        <input
          type="text"
          id="location-input"
          placeholder="Search"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <img src={search_icon} alt="search" onClick={handleSearch} />
      </div>
      <div className="align">
        <img src={weatherIcon} alt="clear" className="weather-icon" />
        <div className="content">
          <p className="temperature">
            {data.main?.temp ? Math.round(data.main?.temp) : ".."}°C
          </p>
          <p className="location">{data.name}</p>
        </div>
      </div>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="humidity" />
          <div>
            <p>{data.main?.humidity ? data.main?.humidity : "..."}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="wind" />
          <div>
            <p>{data.wind?.speed ? data.wind?.speed : "..."} Km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
