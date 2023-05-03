//TODO: resolve the problem

function flickerBeatTile(tileNumber, delayLength) {
  console.log("+++flickering: " + tileNumber + ", " + delayLength);

  const tile = document
    .querySelector("#beat-board")
    .childNodes[tileNumber];

    console.log(tile);

  tile.classList.add("flicker");

  setTimeout(() => {
    tile.classList.remove("flicker");
  }, delayLength);
}

function clear() {
  Array.from(document.querySelector("#beat-board").childNodes).forEach((x) =>
    x.classList.remove("flicker")
  );
}

export { flickerBeatTile, clear };
