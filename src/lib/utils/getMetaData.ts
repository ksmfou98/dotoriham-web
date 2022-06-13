import cheerio from "cheerio";

export interface MetaData {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const getMetaDataByUrl = async (html: string) => {
  const $ = cheerio.load(html);
  const title = $("title").text() || "";
  const ogImage = $("meta[property='og:image']").attr("content") || "";
  const description =
    $("meta[property='og:description']").attr("content") || "";
  return {
    title,
    image: ogImage,
    description,
  };
};
