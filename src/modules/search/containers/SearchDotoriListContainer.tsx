import { SearchDotoriList } from "../components";
import { useSearchDotoriListService } from "../services";

function SearchDotoriListContainer() {
  const { dotoriList } = useSearchDotoriListService();

  return (
    <div>
      <SearchDotoriList dotoriList={dotoriList} />
    </div>
  );
}

export default SearchDotoriListContainer;
