import Weather from "./Weather";

const Country = ({ country, showInfo, weatherData, handleReset }) => {
  return (
    <div>
      {showInfo ? <button onClick={handleReset}>Hide Info</button> : ""}
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((lang) => (
          <li key={lang}>{country.languages[lang]}</li>
        ))}
      </ul>
      <div>
        <img alt="" src={country.flags.png} />
      </div>
      {Object.keys(weatherData).length && showInfo ? (
        <Weather
          capital={country.capital}
          temp={weatherData.main.temp}
          icon={weatherData.weather[0].icon}
        />
      ) : (
        ""
      )}
    </div>
  );
};


export default Country;
