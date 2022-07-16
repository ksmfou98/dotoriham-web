import { Search24Icon } from "assets/icons";
import useInput from "modules/@shared/hooks/useInput";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Path from "routes/Path";
import { toast } from "react-toastify";
import { ToastSize } from "modules/@shared/hooks/useToast";

function SearchBar() {
  const navigate = useNavigate();
  const [searchForm, onChangeSearchForm] = useInput("");

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchForm.length === 0) {
      toast(" ❗ 검색어를 입력해주세요 ❗", {
        className: ToastSize.small,
      });
      return;
    }
    navigate(`${Path.SearchPage}?q=${searchForm}`);
  };

  return (
    <SearchBarStyled onSubmit={onSearch}>
      <SearchIcon type="submit">
        <Search24Icon />
      </SearchIcon>
      <SearchInput
        placeholder="도토리 검색 ..."
        value={searchForm}
        onChange={onChangeSearchForm}
      />
    </SearchBarStyled>
  );
}

const SearchBarStyled = styled.form`
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 6px;
  width: 480px;
  height: 32px;
  padding: 4px 8px;
  margin-right: 27px;
`;

const SearchIcon = styled.button`
  cursor: pointer;
  margin-right: 6px;
  display: flex;
  margin-top: 2px;
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
