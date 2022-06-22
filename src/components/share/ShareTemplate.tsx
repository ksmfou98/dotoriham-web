import axios from "axios";
import { SERVER_URL } from "lib/constants";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function ShareTemplate() {
  const { shareToken = "" } = useParams<"shareToken">();

  console.log(shareToken);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${SERVER_URL}/api/v1/page/open/${shareToken}`
      );
      console.log(response);
    };

    getData();
  }, [shareToken]);

  return <div>ShareTemplate</div>;
}

export default ShareTemplate;
