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
    //park link
    const parkLink = `https://pl.wikipedia.org${$(e).attr("href")}`;
    //name of park
    const nameOfPark = $(e).text();
    //area
    const area = $(
      `.wikitable tbody tr:nth-child(${i + 2}) td:nth-child(5)`
    ).text();
    //voivodeship
    const voivodeship = $(
      `.wikitable tbody tr:nth-child(${i + 2}) td:nth-child(9)`
    ).text();
    //date
    const date = $(
      `.wikitable tbody tr:nth-child(${i + 2}) td:nth-child(4)`
    ).text();
    const dateText = `${nameOfPark} Park Narodowy powstał w roku ${date}. `;

    parksData.push({
      name: nameOfPark,
      date: dateText,
      area: area,
      voivodeship: voivodeship,
      href: parkLink,
      symbol: "",
      description: "",
      title: "",
    });
  });
};

const fetchNationalPark = async () => {
  const promises = parksData.map(({ href }) => {
    const nationalParkLink = href;
    return fetch(nationalParkLink);
  });
  const results = await Promise.all(promises).then((values) => {
    return Promise.all(values.map((element) => element.text()));
  });

  results.forEach((result, i) => {
    const html = result;
    const $ = cheerio.load(html);

    const title = $(".mw-page-title-main").text();
    parksData[i].title = title;
    const symbol = `https:${$(".infobox img[alt*='Logotyp']").attr("src")}`;
    parksData[i].symbol = symbol;
    const description = $(".mw-parser-output > p, h2").text();
    parksData[i].description = description;
  });

  console.log(parksData);
  var jsonData = JSON.stringify(parksData);
  fs.writeFile(
    "nationality-park/nationalParksOfPolandData.json",
    jsonData,
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
};

try {
  await fetchNationalParks().then(fetchNationalPark);
} catch (e) {
  console.log(`ERROR ${e}`);
}
