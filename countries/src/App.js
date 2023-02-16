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
  console.log(props.country.languages);
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
      <h1 style={{ fontSize: 100 }}>{props.country.flag}</h1>
    </div>
  );
};

const Country = (props) => {
  return <div>{props.country.name.official}</div>;
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
        country.name.official.toLowerCase().includes(newSearch.toLowerCase())
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
