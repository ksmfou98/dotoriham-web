import axios from "axios";
import cheerio from "cheerio";

export interface MetaData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const getMetaDataByUrl = async (
  url: string
): Promise<{
  title: string;
  image: string;
  url: string;
  description: string;
}> => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data as string);
  const title = $("title").text() || "";
  const ogImage = $("meta[property='og:image']").attr("content") || "";
  const description =
    $("meta[property='og:description']").attr("content") || "";
  return {
    title,
    image: ogImage,
    url,
    description,
  };
};
