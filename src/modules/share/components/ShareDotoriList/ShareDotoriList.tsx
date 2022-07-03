import { useShareDotoriListQuery } from "modules/share/services";

function ShareDotoriList() {
  const { data } = useShareDotoriListQuery();

  return <div>ShareDotoriList</div>;
}

export default ShareDotoriList;
