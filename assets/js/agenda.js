const response = await fetch("/assets/spectacles.json");
const data = await response.json();
const shows = data.spectacles;

// I get the html element
const showsContainer = document.querySelector(".agenda-grid");

let index = 0;
let currentRow;

// A card = img (img) + schedule (p) + artist name (h3) + show name (p)
shows.forEach((show) => {
  const card = document.createElement("div");
  card.classList.add("show-card");

  card.style.backgroundImage = `url(${show.image})`;

  const schedule = document.createElement("div");

  const date = document.createElement("p");
  date.classList.add("show-date");
  date.textContent = show.date;
  const separator = document.createTextNode(" • ");
  const hour = document.createElement("p");
  hour.textContent = show.horaire;
  hour.classList.add("show-hour");

  const artistShowInfo = document.createElement("div");
  artistShowInfo.classList.add("artistShowInfo");
  const artist = document.createElement("h3");
  artist.textContent = show.artiste;
  artist.classList.add("show-artist");
  const showName = document.createElement("h4");
  showName.textContent = show.titre;
  showName.classList.add("show-name");

  schedule.appendChild(date);
  schedule.appendChild(separator);
  schedule.appendChild(hour);
  artistShowInfo.appendChild(artist);
  artistShowInfo.appendChild(showName);

  card.appendChild(schedule);
  card.appendChild(artistShowInfo);

  showsContainer.appendChild(card);

  if (index % 3 === 0) {
    const newRow = document.createElement("div");
    newRow.classList.add("row, px-0");

    const newCol = document.createElement("div");
    newCol.classList.add("col-md-4");

    newCol.appendChild(card);
    newRow.appendChild(newCol);

    showsContainer.appendChild(newRow);

    currentRow = newRow;
  } else {
    const newCol = document.createElement("div");
    newCol.classList.add("col-md-4");
    newCol.appendChild(card);
    currentRow.appendChild(newCol);
  }
  index++;
});
