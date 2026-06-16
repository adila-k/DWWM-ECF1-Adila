const { createElement } = require("react");

const response = await fetch("/assets/spectacles.json");
const shows = await response.json();

// I get the html element
const container = document.querySelector(".agenda-grid");

// A card = img (img) + schedule (p) + artist name (h3) + show name (p)
shows.forEach((show) => {
  const card = createElement("div");
  card.classList.add("show-card");
});
