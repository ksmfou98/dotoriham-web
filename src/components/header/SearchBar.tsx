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

const SearchBarStyled = styled.form`
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 6px;
  width: 570px;
  height: 32px;
  padding: 4px 8px;
  margin-right: 27px;
`;

const SearchIcon = styled.div`
  cursor: pointer;
  margin-right: 6px;
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  height: 100%;
  width: 100%;
  font-size: 12px;
  padding-bottom: 2px;
`;

export default SearchBar;
