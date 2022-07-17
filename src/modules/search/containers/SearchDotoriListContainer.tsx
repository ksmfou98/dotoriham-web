import { SearchDotoriList, SearchDotoriNavigation } from "../components";
import { useSearchDotoriListService } from "../services";

function SearchDotoriListContainer() {
  const { data } = useSearchDotoriListService();

  return (
    <>
      <SearchDotoriNavigation />
      <SearchDotoriList dotoriList={data} />
    </>
  );
}

export default SearchDotoriListContainer;
