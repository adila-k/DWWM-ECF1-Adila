const windowWidth = window.innerWidth;

const response = await fetch("/assets/spectacles.json");
const data = await response.json();
const shows = data.spectacles;

const cardsContainer = document.querySelector(".agenda-grid");

// Index to track where to create a new bootstrap row
let index = 0;
let currentRow;

shows.forEach((show) => {
  // Create a card
  const card = document.createElement("div");
  card.classList.add("show__card");
  // Create elements of a card and set classes if needed
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

  // Compute current available slots

  const pourcentage = (show.places_vendues / show.places_total) * 100;

  // If there are no more tickets available
  if (pourcentage === 100) {
    const showSoldOut = document.createElement("p");
    showSoldOut.classList.add("show__label", "show__label--full");
    showSoldOut.textContent = "Sold out";
    showPictureWrapper.appendChild(showSoldOut);
  }
  fullProgressionBar.appendChild(currentProgressionBar);

  // Link everything together

  showPictureWrapper.appendChild(showImage);
  showPictureWrapper.appendChild(showLink);

  card.appendChild(showPictureWrapper);
  card.appendChild(showArtist);
  card.appendChild(showLink);
  card.appendChild(showDate);
  card.appendChild(fullProgressionBar);

  const progressBar = card.querySelector(".show__current-progression-bar");
  progressBar.style.width = pourcentage + "%";

  if (index % 3 === 0) {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.classList.add("gx-5");
    newRow.classList.add("px-0");

    const newCol = document.createElement("div");
    newCol.classList.add("col-md-4");

    newCol.appendChild(card);
    newRow.appendChild(newCol);

    cardsContainer.appendChild(newRow);

    index++;
    currentRow = newRow;
  } else {
    const newCol = document.createElement("div");
    newCol.classList.add("col-md-4");
    newCol.appendChild(card);
    currentRow.appendChild(newCol);
    index++;
  }
});
