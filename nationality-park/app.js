import parksData from "./nationalParksOfPolandData.json" assert { type: "json" };

const setLandingPageLayout = ({ name, title, description }) => {
  document.querySelector(
    "#homeBox"
  ).style.backgroundImage = `url('img/${name}.jpg')`;
  document.querySelector("#title").innerHTML = title;
  document.querySelector("#description").innerHTML = `${description.replace(
    / *\[[^)]*\] */g,
    ""
  )} Park Narodowy`;
  document
    .querySelector("#moreInfoBtn")
    .setAttribute("href", `park.html?parkName=${name}`);
};
const addParks = (html) => {
  document.querySelector("#parksGrid").innerHTML = html;
};

const displayData = () => {
  const xValues = [];
  const yValues = [];
  const randomNumber = Math.floor(Math.random() * 23);
  let dataHTML = ``;

  setLandingPageLayout(parksData[randomNumber]);

  parksData.forEach(({ name, symbol, area }) => {
    dataHTML += `
    <a href="park.html?parkName=${name}">
      <div style="background-image: url('img/${name}.jpg')" id="${name}" class="parkCard">
        <img src="${symbol}">
      </div>
    </a>`;

    xValues.push(name);
    yValues.push(area.replace(" km2", "").replace(",", "."));
  });

  addParks(dataHTML);

  new Chart("nationalParksChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: "green",
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Powierzchnia na km²",
      },
    },
  });
};

window.addEventListener("DOMContentLoaded", () => {
  displayData();
});
