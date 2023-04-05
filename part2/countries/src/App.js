import { useState, useEffect } from "react";
import axios from "axios";

import Display from "./components/Display";

function App() {
  const [countryList, setCountryList] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountryList(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <div>
        Find Countries <input value={value} onChange={handleChange} />
      </div>
      <Display countryList={countryList} value={value} />
    </div>
  );
}

export default App;
