import axios from "axios";
import React, { useState, useEffect } from "react";

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <div> Too many matches, specify another filter </div>;
  } else if (filteredCountries.length === 1) {
    return <CountryDetail country={filteredCountries[0]} />;
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <Country key={country.cca3} country={country} />
        ))}
      </div>
    );
  }
};

const CountryDetail = (props) => {
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(api_key);
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setwindSpeed] = useState(0);
  const [windDirection, setwindDirection] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", {
        params: { access_key: api_key, query: props.country.capital[0] },
      })
      .then((response) => {
        setTemperature(response.data.current.temperature);
        setwindSpeed(response.data.current.wind_speed);
        setwindDirection(response.data.current.wind_dir);
        setIcon(response.data.current.weather_icons[0]);
        console.log(response.data);
      });
  }, [api_key, props.country.capital]);
  return (
    <div>
      <h2>{props.country.name.conmon}</h2>
      <div>capital {props.country.capital}</div>
      <div>population {props.country.population}</div>
      <h2>languages</h2>
      <ul>
        {Object.values(props.country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <h2 style={{ fontSize: 80 }}>{props.country.flag}</h2>
      <h2>Weather in {props.country.capital}</h2>
      <div>
        <b>temperature: </b>
        {temperature} Celsius
      </div>
      <div>
        {" "}
        <img src={icon} alt="Current weater icon" />
      </div>
      <div>
        <b>wind: </b>
        {windSpeed} mph direction {windDirection}
        <hr></hr>
      </div>
    </div>
  );
};

const Country = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  if (show) {
    return (
      <div>
        <div>
          {props.country.name.official}{" "}
          <button onClick={handleShow}>show</button>
        </div>
        <CountryDetail country={props.country} />
      </div>
    );
  }
  return (
    <div>
      {props.country.name.official} <button onClick={handleShow}>show</button>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    setSearch(event.target.value);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(newSearch.toLowerCase())
      )
    );
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
    });
  }, []);

  return (
    <div>
      find countries
      <input value={search} onChange={handleSearchChange} />
      <Countries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
