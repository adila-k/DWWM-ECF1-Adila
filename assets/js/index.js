fetch("../spectacles.json")
  .then((response) => response.json())
  .then((data) => {
    const shows = data.spectacles;

    // On récupère les 3 cartes présentes dans le HTML
    const cards = document.querySelectorAll(".upcoming-shows__card-item");

    // Create a table to store random indexes
    const randomIndexes = [];

    // Get 3 random indexes
    while (randomIndexes.length < 3) {
      const index = Math.floor(Math.random() * shows.length);
      if (!randomIndexes.includes(index)) {
        randomIndexes.push(index);
      }
    }

    // Create an array to get the 3 random shows
    const randomShows = randomIndexes.map((index) => shows[index]);

    randomShows.forEach((show, index) => {
      const imageElement = cards[index].querySelector(
        ".upcoming-shows__card-picture-item",
      );
      const titleElement = cards[index].querySelector(
        ".upcoming-shows__card-title",
      );

      imageElement.src = show.image;
      imageElement.alt = show.titre;
      titleElement.textContent = show.titre;
    });
  });
