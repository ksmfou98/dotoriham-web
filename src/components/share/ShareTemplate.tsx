import axios from "axios";
import DotoriList from "components/dotori/DotoriList";
import { SERVER_URL } from "lib/constants";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setDotoris } from "stores/dotori";
import { IDotoriListResponse } from "types/dotori";

function ShareTemplate() {
  const { shareToken = "" } = useParams<"shareToken">();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get<IDotoriListResponse>(
          `${SERVER_URL}/api/v1/page/open/${shareToken}`
        );
        console.log(data);
        dispatch(
          setDotoris(
            data.content.map((dotori) => ({ ...dotori, checked: false }))
          )
        );
      } catch (e) {
        console.log("북마크를 불러오는데 실패했습니다");
      }
    };

    getData();
  }, [shareToken, dispatch]);

  return (
    <div>
      <DotoriList path="main" />
    </div>
  );
}

export default ShareTemplate;
