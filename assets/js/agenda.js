const response = await fetch("/assets/spectacles.json");
const data = await response.json();
const shows = data.spectacles;

const cardsContainer = document.querySelector(".agenda-grid");
const filtersTypeContainer = document.querySelector(".filter-type");
const filtersDaysContainer = document.querySelector(".filter-day");

// I need filters to be empty before using filters
let filtersActive = {
  type: null,
  jour: null,
};

// I create a function to generate cards from JSON

function generateCards(show) {
  const card = document.createElement("div");
  card.classList.add("show__card");

  const showPictureWrapper = document.createElement("div");
  showPictureWrapper.classList.add("show__picture");
  const showImage = document.createElement("img");
  showImage.src = show.image;
  showImage.alt = show.titre;

  const showArtist = document.createElement("h3");
  showArtist.textContent = show.artiste;
  showArtist.classList.add("show__artist");

  const showLink = document.createElement("a");
  showLink.textContent = show.titre;

  const showDate = document.createElement("p");
  showDate.textContent = show.date;

  const fullProgressionBar = document.createElement("div");
  fullProgressionBar.classList.add("show__full-progression-bar");
  const currentProgressionBar = document.createElement("div");
  currentProgressionBar.classList.add("show__current-progression-bar");

  const getTicket = document.createElement("button");
  getTicket.classList.add("show__buyTicket");
  getTicket.textContent = "Réservez votre place";

  // I compute available slots
  const pourcentage = (show.places_vendues / show.places_total) * 100;

  // If no more slots are available, the sold out label will be displayed
  if (pourcentage === 100) {
    const showSoldOut = document.createElement("p");
    showSoldOut.classList.add("show__label", "show__label--full");
    showSoldOut.textContent = "Sold out";
    showPictureWrapper.appendChild(showSoldOut);
    getTicket.classList.add("show__buyTicket-soldout");
    getTicket.textContent = "Plus de places disponibles";
  }

  fullProgressionBar.appendChild(currentProgressionBar);

  showPictureWrapper.appendChild(showImage);

  card.appendChild(showPictureWrapper);
  card.appendChild(showArtist);
  card.appendChild(showLink);
  card.appendChild(showDate);
  card.appendChild(fullProgressionBar);
  card.appendChild(getTicket);

  currentProgressionBar.style.width = pourcentage + "%";
  currentProgressionBar.textContent = Math.round(pourcentage) + "%";

  return card;
}

////////////////
// SHOWS GRID //
///////////////

function displayShows(showsList) {
  cardsContainer.innerHTML = "";

  let index = 0;
  let currentRow;

  showsList.forEach((show) => {
    const card = generateCards(show);

    if (index % 3 === 0) {
      const newRow = document.createElement("div");
      newRow.classList.add("row", "gx-5", "px-0");

      const newCol = document.createElement("div");
      newCol.classList.add("col-md-4");
      newCol.classList.add("col-xs-6");
      newCol.classList.add("col-12");

      newCol.appendChild(card);
      newRow.appendChild(newCol);

      cardsContainer.appendChild(newRow);
      currentRow = newRow;
    } else {
      const newCol = document.createElement("div");
      newCol.classList.add("col-md-4");
      newCol.classList.add("col-xs-6");
      newCol.classList.add("col-12");
      newCol.appendChild(card);
      currentRow.appendChild(newCol);
    }
    index++;
  });
}

//////////////////
// FILTER SHOWS //
//////////////////

function filterShows() {
  const result = shows.filter((show) => {
    const matchType = !filtersActive.type || show.type === filtersActive.type;
    const matchDay = !filtersActive.jour || show.date === filtersActive.jour;
    return matchType && matchDay;
  });

  displayShows(result);
}

/////////////////
// FILTER TYPE //
/////////////////

function createTypeButton() {
  const typeItem = [...new Set(shows.map((show) => show.type))];

  const allButtons = document.createElement("button");
  allButtons.textContent = "Tous";
  allButtons.classList.add("filter-btn", "active");
  allButtons.addEventListener("click", () => {
    filtersActive.type = null;
    updateActiveBtn(filtersTypeContainer, allButtons);
    filterShows();
  });
  filtersTypeContainer.appendChild(allButtons);

  typeItem.forEach((type) => {
    const button = document.createElement("button");
    button.textContent = type;
    button.classList.add("filter-btn");

    button.addEventListener("click", () => {
      filtersActive.type = type;
      updateActiveBtn(filtersTypeContainer, button);
      filterShows();
    });

    filtersTypeContainer.appendChild(button);
  });
}

//////////////////////
// FILTER DAY - BTN //
//////////////////////

const monthsNames = {
  "01": "janv.",
  "02": "févr.",
  "03": "mars",
  "04": "avr.",
  "05": "mai",
  "06": "juin",
  "07": "juil.",
  "08": "août",
  "09": "sept.",
  10: "oct.",
  11: "nov.",
  12: "déc.",
};

function getFullDate(dateISO) {
  const [year, month, day] = dateISO.split("-");
  return `${day} ${monthsNames[month]}`;
}

function createDayButton() {
  const dayItem = [...new Set(shows.map((show) => show.date))].sort();

  const allButtons = document.createElement("button");
  allButtons.textContent = "Tous";
  allButtons.classList.add("filter-btn", "active");
  allButtons.addEventListener("click", () => {
    filtersActive.jour = null;
    updateActiveBtn(filtersDaysContainer, allButtons);
    filterShows();
  });
  filtersDaysContainer.appendChild(allButtons);

  dayItem.forEach((jourISO) => {
    const button = document.createElement("button");
    button.textContent = getFullDate(jourISO);
    button.classList.add("filter-btn");

    button.addEventListener("click", () => {
      filtersActive.jour = jourISO;
      updateActiveBtn(filtersDaysContainer, button);
      filterShows();
    });

    filtersDaysContainer.appendChild(button);
  });
}

///////////////////////////////
// GET THE ACTIVE BTN STYLED //
//////////////////////////////

function updateActiveBtn(container, selectedBtn) {
  container
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  selectedBtn.classList.add("active");
}

createTypeButton();
createDayButton();
displayShows(shows);
