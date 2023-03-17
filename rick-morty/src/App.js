import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./components/CharacterList";
import { getCharacters } from "rickmortyapi";
import { BASE_URL, API_KEY } from "./components/index";
import Character from "./components/Character";
import Details from "./components/Details";
import styled from "styled-components";
import "./App.css";

const StyledContainer = styled.div`
  display: flex;
  border: 1px solid rgb(210, 210, 210);
  box-shadow: 0px 1px 6px -2px rgb(128, 127, 127);
  border-radius: 8px;
  margin: 16px;
  padding: 16px 8px 12px 16px;
  background-color: rgba(255, 255, 255, 0.6);
  .list {
    width: 50%;
    display: flex;
  }
  .details {
    width: 30%;
    justify-content: flex-end;
  }
`;

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a
  // side effect in a component, you want to think about which state and/or props it should

  // sync up with, if any.
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  let pageNum = 1;
  let charac = [];
  const openDetails = (id) => {
    setCurrentCharacter(id);
  };

  const closeDetails = () => {
    setCurrentCharacter(null);
  };

  // const fetchCharacters = async () => {
  //   let moreCharac = [];
  //   axios.get(`${BASE_URL}${API_KEY}?page=${pageNum}`)
  //     .then((res) => {
  //       charac.push(res.data.results);
  //       pageNum += 1;
  //       console.log(charac);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const fetchCharacters = async () => {
    while (pageNum < 43) {
      const res = await getCharacters({ page: pageNum });
      setCharacters((ch) => [...ch, res.data.results]);
      pageNum += 1;
    }
  };

  useEffect(() => {
    fetchCharacters();
    console.log(characters);
  }, []);

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <CharacterList />
    </div>
  );
};

export default App;
