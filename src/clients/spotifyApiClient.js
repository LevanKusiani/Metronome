import axios from "axios";
import config from "../config.json";

const refreshToken = async () => {
  try {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    const response = await axios.post(
      `${config.SPOTIFYAPI.AUTH_URL}api/token`,
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(clientId + ':' + clientSecret)
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Could not fetch token: ", error);
    throw error;
  }
};

const getToken = () => {
  const tokenData = JSON.parse(sessionStorage.getItem("spotifyTokenData"));

  if (tokenData && new Date(tokenData.expirationDate) > new Date()) {
    return tokenData.token;
  } else {
    refreshToken().then(data => {
        const newTokenData = {
            token: data.access_token,
            expirationDate: new Date(Date.now() + data.expires_in * 1000),
          };
      
          sessionStorage.setItem("spotifyTokenData", JSON.stringify(newTokenData));
      
          return newTokenData.token;
    });
  }
};

export const searchTracks = async (query) => {
  try {
    const token = await getToken();

    if (!token || token === "") {
      throw new Error("Unable to authenticate with Spotify API");
    }

    const response = await axios.get(
      `${config.SPOTIFYAPI.BASE_URL}v1/search?q=${query}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Could not fetch query data: ", error);
    throw error;
  }
};

export const getTrackDetails = async (id) => {
  try {
    const token = getToken();

    const response = await axios.get(
        `${config.SPOTIFYAPI.BASE_URL}v1/audio-features?ids=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Could not fetch track details: ", error);
    throw error;
  }
};