function flickerBeatTile(tileNumber, delayLength) {
  const tile = document.querySelector("#beat-board").childNodes[tileNumber];

  const isDark = (element) => element.indexOf("dark") > -1;
  const clsName = Array.from(tile.classList).some(isDark) ? "flicker-dark" : "flicker";

  tile.classList.add(clsName);

  setTimeout(() => {
    tile.classList.remove(clsName);
  }, 800);
}

function clear() {
  Array.from(document.querySelector("#beat-board").childNodes).forEach((x) => {
    x.classList.remove("flicker");
    x.classList.remove("flicker-dark");
  });
}

export { flickerBeatTile, clear };
