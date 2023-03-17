import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Character from "./Character";

function CharacterList() {
  const [page, setPage] = useState(1);
  const [characterList, setChaarcterList] = useState([]);
  const [size, setSize] = useState(20);
  const [total, setTotal] = useState(826);

  const updatePage = (selectedPage) => {
    setPage(selectedPage);
  };

  useEffect(() => {
    const getCharacterList = () => {
      axios
        .get(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then((res) => {
          setChaarcterList(res.data.results);
          setTotal(res.info.count);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCharacterList();
  }, [page]);

  return (
    <div>
      <Pagination
        currentPage={page}
        totalCount={total}
        pageSize={size}
        onPageChange={updatePage}
      />
      <div className="characterList-wrapper">
        {characterList.map((ch) => (
          <Character
            key={ch.id}
            name={ch.name}
            gender={ch.gender}
            status={ch.status}
            species={ch.species}
            type={ch.type}
            image={ch.image}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
