import styles from "./SearchResultElement.module.css";

const SearchResultElement = ({
  elementId,
  playingTrackId,
  isPlaying,
  trackInfo,
  onSelect,
  onPreview,
}) => {
  const clickHandler = () => {
    onSelect(trackInfo.id);
  };

  const previewHandler = (e) => {
    e.stopPropagation();

    onPreview(elementId, trackInfo.preview_url);
  };

  return (
    <div
      className={`${styles["element-container"]}`}
      onClick={() => clickHandler()}
    >
      <div className={`${styles["album-logo"]}`}>
        <img src={trackInfo.album.images[2].url} alt={trackInfo.album.name} />
        {/* width="50" height="50" */}
      </div>
      <div className={`${styles["track-info"]}`}>
        <h4>{trackInfo.name}</h4>
        <p>{trackInfo.artists[0].name}</p>
        {/* <p>{trackInfo.album.name}</p> */}
      </div>
      <div className={`${styles.preview}`}>
        <button onClick={(e) => previewHandler(e)}>
          {isPlaying && elementId === playingTrackId ? "■" : "►"}
        </button>
      </div>
    </div>
  );
};

export default SearchResultElement;
