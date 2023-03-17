// Write your Character component here
import React from "react";
import PropTypes from "prop-types";
function Character({ name, image }) {
  return (
    <div className="charcterListWrapper">
      <div className="imageWrapper">
        <h2>{name}</h2>
        <img className="characterImage" src={image} alt="image of character" />
      </div>
    </div>
  );
}
Character.propTypes = {
  name: PropTypes.string,
  gender: PropTypes.string,
  type: PropTypes.string,
  species: PropTypes.string,
  status: PropTypes.string,
};

Character.defaultProps = {
  name: "",
  gender: "",
  type: "",
  species: "",
  status: "",
};
export default Character;
