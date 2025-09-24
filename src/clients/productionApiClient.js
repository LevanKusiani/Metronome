// Production-safe API client that uses mock data
// This prevents exposing the real API key on GitHub Pages

const MOCK_TRACKS = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: { name: "Queen" },
    album: { title: "A Night at the Opera" },
    tempo: "72",
    time_sig: "4/4",
    key_of: "Bb",
  },
  {
    id: "2", 
    title: "Billie Jean",
    artist: { name: "Michael Jackson" },
    album: { title: "Thriller" },
    tempo: "117",
    time_sig: "4/4",
    key_of: "F#m",
  },
  {
    id: "3",
    title: "Smells Like Teen Spirit",
    artist: { name: "Nirvana" },
    album: { title: "Nevermind" },
    tempo: "117",
    time_sig: "4/4",
    key_of: "Fm",
  },
  {
    id: "4",
    title: "Hotel California", 
    artist: { name: "Eagles" },
    album: { title: "Hotel California" },
    tempo: "76",
    time_sig: "4/4",
    key_of: "Bm",
  },
  {
    id: "5",
    title: "Sweet Child O' Mine",
    artist: { name: "Guns N' Roses" },
    album: { title: "Appetite for Destruction" },
    tempo: "125",
    time_sig: "4/4",
    key_of: "D",
  },
  {
    id: "6",
    title: "Imagine",
    artist: { name: "John Lennon" },
    album: { title: "Imagine" },
    tempo: "76",
    time_sig: "4/4",
    key_of: "C",
  },
  {
    id: "7",
    title: "Stairway to Heaven",
    artist: { name: "Led Zeppelin" },
    album: { title: "Led Zeppelin IV" },
    tempo: "82",
    time_sig: "4/4",
    key_of: "Am",
  },
  {
    id: "8",
    title: "Like a Rolling Stone",
    artist: { name: "Bob Dylan" },
    album: { title: "Highway 61 Revisited" },
    tempo: "108",
    time_sig: "4/4",
    key_of: "C",
  },
];

// Mock search function
export const searchTracks = async (query) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query || query.trim().length === 0) {
    return { search: [] };
  }
  
  const searchTerm = query.toLowerCase();
  const filteredTracks = MOCK_TRACKS.filter(track => 
    track.title.toLowerCase().includes(searchTerm) ||
    track.artist.name.toLowerCase().includes(searchTerm)
  );
  
  // Return in GetSongBPM API format
  return {
    search: filteredTracks.length > 0 ? filteredTracks : MOCK_TRACKS.slice(0, 3)
  };
};

// Mock track details function
export const getTrackDetails = async (trackId) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const track = MOCK_TRACKS.find(t => t.id === trackId);
  
  if (!track) {
    throw new Error("Track not found");
  }
  
  return {
    id: track.id,
    tempo: parseInt(track.tempo),
    name: track.title,
    artist: track.artist.name,
  };
};

const apiClient = {
  searchTracks,
  getTrackDetails,
};

export default apiClient;
