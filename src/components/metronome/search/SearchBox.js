import SearchResultElement from "./SearchResultElement.js";
import { useContext, useEffect, useRef, useState } from "react";

import { ControlContext, ThemeContext } from "../../../context/appContext.js";
import EmptyContainer from "../../UI/EmptyContainer.js";

const SearchBox = ({ items }) => {
  const { setControl } = useContext(ControlContext);
  const { theme } = useContext(ThemeContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [trackId, setTrackId] = useState(null);
  const audio = useRef(null);
  const timeoutId = useRef(null);

  useEffect(() => {
    const thumbColor = theme === "dark" ? "#444" : "#ccc";
    const trackColor = theme === "dark" ? "#222" : "#aaa";
    document.documentElement.style.setProperty(
      "--scrollbar-thumb-color",
      thumbColor
    );
    document.documentElement.style.setProperty(
      "--scrollbar-track-color",
      trackColor
    );
  }, [theme]);

  const playAudio = (src) => {
    audio.current = new Audio(src);
    audio.current.volume = 0.3;
    audio.current.play();

    timeoutId.current = setTimeout(() => {
      audio.current.pause();
      setTrackId(null);
      setIsPlaying(false);
    }, 29000);
  };

  const selectHandler = async (tempo) => {
    setControl((prevState) => {
      return {
        ...prevState,
        tempo: Math.trunc(tempo),
      };
    });
  };

  const previewHandler = (id, src) => {
    if (!isPlaying) {
      playAudio(src);
      setTrackId(id);
      setIsPlaying(true);
    } else {
      if (audio) {
        audio.current.pause();

        if (trackId !== null && trackId !== id) {
          setTrackId(id);
          playAudio(src);
        } else {
          setIsPlaying(false);
          clearTimeout(timeoutId);
        }
      }
    }
  };

  const createItems = () => {
    if (!items || items.length === 0) {
      return <EmptyContainer message="No tracks found :(" />;
    } else {
      return items.map((item, index) => (
        <SearchResultElement
          key={item.id}
          elementId={index}
          playingTrackId={trackId}
          isPlaying={isPlaying}
          trackInfo={item}
          onSelect={selectHandler}
          onPreview={previewHandler}
        />
      ));
    }
  };

  return <>{createItems()}</>;
};

export default SearchBox;
