import parksData from "./nationalParksOfPolandData.json" assert { type: "json" };

const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("parkName");

const displayData = () => {
  const {
    description: fullDescription,
    date,
    title,
    symbol,
    area,
    voivodeship,
  } = parksData.find((element) => element.name === name);
  const [description, history] = fullDescription.split("Historia");

  document.querySelector("#information").innerHTML = `
  <table>
      <tr>
          <th>Symbol</th>
          <th>Nazwa</th>
          <th>Województwo</th>
          <th>Powierzchnia</th>
      </tr>
      <tr>
          <td><img src="${symbol}"></td>
          <td>${title}</td>
          <td>${voivodeship}</td>
          <td>${area}</td>
      </tr>
  </table>
  `;
  document.querySelector(
    "#homeBox"
  ).style.backgroundImage = `url('img/${name}.jpg')`;
  document.querySelector("#title").innerHTML = title;
  document.querySelector("#descriptionLong").innerHTML = description.replace(
    / *\[[^)]*\] */g,
    ""
  );
  document.querySelector("#descriptionHistory").innerHTML =
    date + (history?.replace(/ *\[[^)]*\] */g, "") || "");
};

if (name === null) {
  window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", () => {
  displayData();
});
