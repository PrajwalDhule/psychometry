import React, { useState } from "react";
import "../assets/Dashboard.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import BarChart from "./BarChart";
import Profile from "./Profile";

function Dashboard({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [person, setPerson] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.Name?.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleClick = (name) => {
    setPerson(name);
  };

  return (
    <div className="dashboard-body">
      <div className="top">
        <Profile person={person} />
        <div className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder={placeholder}
              value={wordEntered}
              onChange={handleFilter}
            />
            <div className="searchIcon">
              {filteredData.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon id="clearBtn" onClick={clearInput} />
              )}
            </div>
          </div>
          {filteredData.length != 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value) => {
                return (
                  <p
                    className="dataItem"
                    value={value.Name}
                    onClick={() => handleClick(value.Name)}
                    target="_blank"
                  >
                    <p>{value.Name} </p>
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="chart">
        <BarChart person={person} />
      </div>
    </div>
  );
}

export default Dashboard;
