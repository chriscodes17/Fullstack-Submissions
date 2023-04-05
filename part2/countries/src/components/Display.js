import Country from "./Country";
import CountryName from "./CountryName";
import { useState, useEffect } from "react";
import axios from "axios";

const Display = ({ countryList, value }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [countryInfo, setCountryInfo] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    if (countryInfo) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${countryInfo.capitalInfo.latlng[0]}&lon=${countryInfo.capitalInfo.latlng[1]}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
        .then((res) => {
          setWeatherData(res.data);
        });
    }
  }, [countryInfo]);

  const handleClick = (index) => {
    setCountryInfo(filterData[index]);
    setShowInfo(true);
  };

  const handleReset = () => {
    setShowInfo(false);
    setWeatherData({});
  };

  let filterData = value
    ? countryList.filter((country) =>
        country.name.common.toLowerCase().includes(value)
      )
    : [];

  if (filterData.length > 10) {
    return <div>Too many matches, please add more to the search</div>;
  }
  if (filterData.length === 1) {
    return (
      <Country
        weatherData={weatherData}
        showInfo={showInfo}
        country={filterData[0]}
        handleReset={handleReset}
      />
    );
  }
  if (showInfo) {
    return (
      <Country
        weatherData={weatherData}
        showInfo={showInfo}
        country={countryInfo}
        handleReset={handleReset}
      />
    );
  }
  return (
    <div>
      {filterData.map((country, index) => (
        <CountryName
          key={index}
          name={country.name.common}
          handleClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Display;
