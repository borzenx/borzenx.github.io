import parksData from "./nationalParksOfPolandData.json" assert { type: "json" };

const displayData = () => {
  let dataHTML = ``;
  const rand = Math.floor(Math.random() * 23);
  document.querySelector(
    "#homeBox"
  ).style.background = `url('img/${parksData[rand].name}.jpg')`;
  document.querySelector("#title").innerHTML = parksData[rand].title;
  document.querySelector("#description").innerHTML = `${parksData[
    rand
  ].description.replace(/ *\[[^)]*\] */g, "")} Park Narodowy`;
  document
    .querySelector("#moreInfoBtn")
    .setAttribute("href", `park.html?parkname=${parksData[rand].name}`);
  const xValues = [];
  const yValues = [];
  parksData.forEach((data, i) => {
    dataHTML += `
    <a href="park.html?parkname=${data.name}">
      <div style="background-image: url('img/${data.name}.jpg')" id="${data.name}" class="parkCard">
        <img src="${data.symbol}">
      </div>
    </a>`;
    document.querySelector("#parksGrid").innerHTML = dataHTML;
    xValues.push(data.name);
    yValues.push(data.area.replace(" km2", "").replace(",", "."));
  });
  console.log(yValues);

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
