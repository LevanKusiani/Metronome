// Metronome Configuration Constants
export const METRONOME_CONFIG = {
  // Tempo settings
  MIN_TEMPO: 40,
  MAX_TEMPO: 240,
  DEFAULT_TEMPO: 100,
  
  // Beat settings
  MIN_BEATS: 2,
  MAX_BEATS: 8,
  DEFAULT_BEATS: 4,
  
  // Audio settings
  LOOKAHEAD: 25.0, // milliseconds
  SCHEDULE_AHEAD_TIME: 0.1, // seconds
  NOTE_LENGTH: 0.05, // seconds
  
  // Search settings
  SEARCH_DEBOUNCE_DELAY: 1000, // milliseconds
  
  // Animation settings
  BEAT_ANIMATION_DURATION: 800, // milliseconds
  
  // Theme settings
  DEFAULT_THEME: 'light',
  THEME_STORAGE_KEY: 'theme',
  
  // Spotify settings
  SPOTIFY_TOKEN_STORAGE_KEY: 'spotifyTokenData'
};

export const UI_CONFIG = {
  // Beat step configuration
  MAX_BEAT_STEPS: 8,
  
  // Tempo increment values
  TEMPO_INCREMENT_SMALL: 1,
  TEMPO_INCREMENT_LARGE: 10,
  
  // Keyboard shortcuts
  SPACE_KEY_CODE: 32,
  
  // Search input ID
  SEARCH_INPUT_ID: 'track-searcher'
};
