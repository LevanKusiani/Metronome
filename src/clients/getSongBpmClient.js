import axios from "axios";

const GETSONGBPM_API_KEY = process.env.REACT_APP_GETSONGBPM_API_KEY;

// Environment variable is loaded correctly
const GETSONGBPM_BASE_URL = "https://api.getsong.co";

// Create axios instance with default config
const getSongBpmClient = axios.create({
  baseURL: GETSONGBPM_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add API key to query parameters (not headers)
getSongBpmClient.interceptors.request.use(
  (config) => {
    // Add API key to query parameters instead of headers
    config.params = {
      ...config.params,
      api_key: GETSONGBPM_API_KEY,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
getSongBpmClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("GetSongBPM API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Search tracks by name
export const searchTracks = async (query) => {
  try {
    if (!GETSONGBPM_API_KEY) {
      throw new Error("GetSongBPM API key not configured");
    }

    const response = await getSongBpmClient.get("/search/", {
      params: {
        type: "song",
        lookup: query,
        limit: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching tracks:", error);
    throw error;
  }
};

// Get track details by ID
export const getTrackDetails = async (trackId) => {
  try {
    if (!GETSONGBPM_API_KEY) {
      throw new Error("GetSongBPM API key not configured");
    }

    const response = await getSongBpmClient.get(`/song/${trackId}`);
    return response.data;
  } catch (error) {
    console.error("Error getting track details:", error);
    throw error;
  }
};

// Get track by exact name and artist
export const getTrackByArtistAndName = async (artist, songName) => {
  try {
    if (!GETSONGBPM_API_KEY) {
      throw new Error("GetSongBPM API key not configured");
    }

    const response = await getSongBpmClient.get("/search", {
      params: {
        type: "song",
        q: `${artist} ${songName}`,
        limit: 1,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting track by artist and name:", error);
    throw error;
  }
};

export default getSongBpmClient;
