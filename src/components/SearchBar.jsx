import { useRef } from "react";
import PropTypes from 'prop-types';
import closeIcon from "../assets/closeIcon.svg";
import searchIcon from "../assets/searchIcon.svg";

function SearchBar ({ searchTerm, setSearchTerm }) {
  const inputRef = useRef(null);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div id="searchBar">
      <input ref={inputRef} type="text" name="searchTerm" placeholder="Cerca prodotto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoComplete="off" />
      <div id="searchBarButton" onClick={searchTerm ? handleClearSearch : handleFocusInput}>
        <img src={searchTerm ? closeIcon : searchIcon} alt={searchTerm ? "Cancella" : "Cerca"} draggable="false" />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
}

export default SearchBar