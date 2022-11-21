import cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

const parksData = [];

const fetchNationalParks = async () => {
  const nationalParksLink =
    "https://pl.wikipedia.org/wiki/Parki_narodowe_w_Polsce";
  const title = "Park Narodowy";
  const response = await fetch(nationalParksLink);
  const html = await response.text();
  const $ = cheerio.load(html);

  $(`.wikitable tbody tr td a[title*='${title}']`).each((i, e) => {
    const href = `https://pl.wikipedia.org${$(e).attr("href")}`;
    const name = $(e).text();

    const getCell = (number) =>
      $(
        `.wikitable tbody tr:nth-child(${i + 2}) td:nth-child(${number})`
      ).text();

    const area = getCell(5);
    const voivodeship = getCell(9);
    const date = getCell(4);

    const dateText = `${name} Park Narodowy powstał w roku ${date}. `;

    parksData.push({
      id: i,
      name,
      date: dateText,
      area,
      voivodeship,
      href,
      symbol: "",
      description: "",
      title: "",
    });
  });
};

const fetchNationalPark = async () => {
  const promises = parksData.map(({ href }) => fetch(href));
  const results = await Promise.all(promises).then((values) => {
    return Promise.all(values.map((element) => element.text()));
  });

  results.forEach((result, i) => {
    const $ = cheerio.load(result);

    parksData[i].title = $(".mw-page-title-main").text();
    parksData[i].symbol = `https:${$(".infobox img[alt*='Logotyp']").attr(
      "src"
    )}`;
    parksData[i].description = $(".mw-parser-output > p, h2").text();
  });

  fs.writeFile(
    "nationality-park/nationalParksOfPolandData.json",
    JSON.stringify(parksData),
    function (err) {
      if (err) {
        console.error(err);
      }
    }
  );
};

try {
  await fetchNationalParks().then(fetchNationalPark);
} catch (e) {
  console.error(`ERROR ${e}`);
}
