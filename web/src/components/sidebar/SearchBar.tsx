import { Search24Icon } from "assets/icons";
import React from "react";
import styled from "styled-components";

function SearchBar() {
  return (
    <SearchBarStyled>
      <SearchIcon>
        <Search24Icon />
      </SearchIcon>
      <SearchInput placeholder="도토리 검색 ..." />
    </SearchBarStyled>
  );
}

const SearchBarStyled = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(72, 191, 145, 0.1);
  border-radius: 6px;
  height: 32px;
  margin-top: 16px;
  padding: 4px 8px;
`;

const SearchIcon = styled.div`
  cursor: pointer;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  height: 100%;
`;

export default SearchBar;
