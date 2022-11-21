import parksData from "./nationalParksOfPolandData.json" assert { type: "json" };

const displayData = () => {
  let dataHTML = ``;
  const rand = Math.floor(Math.random() * 23);

  document.querySelector(
    "#homeBox"
  ).style.backgroundImage = `url('img/${parksData[rand].name}.jpg')`;
  document.querySelector("#title").innerHTML = parksData[rand].title;
  document.querySelector("#description").innerHTML = `${parksData[
    rand
  ].description.replace(/ *\[[^)]*\] */g, "")} Park Narodowy`;
  document
    .querySelector("#moreInfoBtn")
    .setAttribute("href", `park.html?parkName=${parksData[rand].name}`);

  const xValues = [];
  const yValues = [];

  parksData.forEach(({ name, symbol, area }) => {
    dataHTML += `
    <a href="park.html?parkName=${name}">
      <div style="background-image: url('img/${name}.jpg')" id="${name}" class="parkCard">
        <img src="${symbol}">
      </div>
    </a>`;

    document.querySelector("#parksGrid").innerHTML = dataHTML;
    xValues.push(name);
    yValues.push(area.replace(" km2", "").replace(",", "."));
  });

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
