const Weather = ({ capital, temp, icon }) => {
  const imageSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Current Temperature: {temp} Celsius</p>
      <img alt="" src={imageSrc} />
    </div>
  );
};

export default Weather;
