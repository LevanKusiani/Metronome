// Conditional API client that switches between real and mock data
// Uses real GetSongBPM API in development, mock data in production

import { searchTracks as realSearchTracks, getTrackDetails as realGetTrackDetails } from './getSongBpmClient';
import { searchTracks as mockSearchTracks, getTrackDetails as mockGetTrackDetails } from './productionApiClient';

const isDevelopment = process.env.NODE_ENV === 'development';
const hasApiKey = process.env.REACT_APP_GETSONGBPM_API_KEY;

// Use real API only in development with API key, otherwise use mock data
export const searchTracks = (isDevelopment && hasApiKey) ? realSearchTracks : mockSearchTracks;
export const getTrackDetails = (isDevelopment && hasApiKey) ? realGetTrackDetails : mockGetTrackDetails;
