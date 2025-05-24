// app/api/profiles.ts
import { Profile } from '../types';
import { fetchMovieById } from './movies';

const API_BASE = 'http://localhost:3000';

// Key for storing mock profiles in localStorage
const MOCK_PROFILES_KEY = 'mock-profiles';
const MOCK_WATCHLIST_KEY = 'mock-watchlist';
const MOCK_WATCH_HISTORY_KEY = 'mock-watch-history';  

// Helper function to make authenticated requests
const authFetch = async (endpoint: string, options: { headers?: Record<string, string>, method?: string, body?: any } = {}) => {
  // For client-side only
  if (typeof window === 'undefined') {
    throw new Error('Cannot make authenticated requests server-side');
  }
  
  const token = localStorage.getItem('auth-token');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...(options.headers || {})
  };
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("API request failed:", error);
    
    // For development, use enhanced mock data handling
    // Missing implementation here - using mock data fallback below
    
    throw error;
  }
};

// Get stored mock profiles or initialize with defaults
const getMockProfiles = (): Profile[] => {
  if (typeof window === 'undefined') {
    return getDefaultProfiles();
  }

  const storedProfiles = localStorage.getItem(MOCK_PROFILES_KEY);

  if (storedProfiles) {
    try {
      return JSON.parse(storedProfiles);
    } catch (e) {
      console.error("Error parsing stored profiles:", e);
      return getDefaultProfiles();
    }
  } else {
    // Initialize with default profiles
    const defaultProfiles = getDefaultProfiles();
    localStorage.setItem(MOCK_PROFILES_KEY, JSON.stringify(defaultProfiles));
    return defaultProfiles;
  }
};
 

// Default profiles when nothing is stored
const getDefaultProfiles = (): Profile[] => {
  return [
    {
      id: 'profile-1',
      name: 'User 1',
      avatarUrl: '/avatars/avatar1.png.png',
      isKidsProfile: false,
      
    },
    {
      id: 'profile-2',
      name: 'Kids',
      avatarUrl: '/avatars/avatar4.png.png',
      isKidsProfile: true,
     
    }
  ];
};

// Get a specific mock profile
const getMockProfile = (profileId: string | undefined): Profile => {
  const profiles = getMockProfiles();
   const profile = profiles.find(p => p.id === profileId);
   if (!profile) {
    console.warn(`Profile with ID ${profileId} not found, returning first profile as fallback`);
  }
  return profile || profiles[0];  
};

const getMockWatchlist = (profileId: string) => {
  if(typeof window === 'undefined') {
    return [];
}

const storedWatchlists = localStorage.getItem(MOCK_WATCHLIST_KEY); 
let watchlists: { [key: string]: any[] } = {};

if (storedWatchlists) {
  try {
    watchlists = JSON.parse(storedWatchlists);
  } catch (e) {
    console.error("Error parsing stored watchlists:", e);
    watchlists = {};

  }
}

return (watchlists[profileId] || []).map(item => ({
  id: `watchlist-item-${item.id}`,
  content: item
  
}));
};

const saveMockWatchList = (profileId: string, watchlist: any[]) => {
  if(typeof window === 'undefined') {
    return;
}

const storedWatchlists = localStorage.getItem(MOCK_WATCHLIST_KEY);
let watchlists: {[key: string]: any[]} = {};

if(storedWatchlists) {
  try {
    watchlists = JSON.parse(storedWatchlists);
  } catch (e) {
    console.error("Error parsing stored watchlists:", e);
    watchlists = {};
  }
}

watchlists[profileId] = watchlist;
localStorage.setItem(MOCK_WATCHLIST_KEY, JSON.stringify(watchlists));
};  

const getMockWatchHistory = (profileId: string) => {
  if (typeof window === 'undefined') {
    return [];
  }
  const storedWatchHistory = localStorage.getItem(MOCK_WATCH_HISTORY_KEY);
  let watchHistories: { [key: string]: any[] } = {};

  if(storedWatchHistory) {
    try {
      watchHistories = JSON.parse(storedWatchHistory);
    }
    catch (e) {
      console.error("Error parsing stored watch history:", e);
      watchHistories = {};
    }
  }
  return watchHistories[profileId] || [];
};

const saveMockWatchHistory = (profileId: string, watchHistory: any[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  const storedWatchHistory = localStorage.getItem(MOCK_WATCH_HISTORY_KEY);
  let watchHistories: { [key: string]: any[] } = {};

  if(storedWatchHistory) {
    try {
      watchHistories = JSON.parse(storedWatchHistory);
    } catch(e) {
      console.error("Error parsing stored watch history");
      watchHistories = {};
    }
  }

  watchHistories[profileId] = watchHistory;
  localStorage.setItem(MOCK_WATCH_HISTORY_KEY, JSON.stringify(watchHistories));
};

// Create a mock profile
const createMockProfile = (profileData: Partial<Profile>): Profile => {
  const profiles = getMockProfiles();
  
  // Create new profile with generated ID
  const newProfile: Profile = {
    id: `profile-${Date.now()}`,
    name: profileData.name || 'New Profile',
    avatarUrl: profileData.avatarUrl || '/avatars/default.png',
    isKidsProfile: profileData.isKidsProfile || false,
  
  };
  
  // Add to mock profiles
  profiles.push(newProfile);
  
  // Update local storage
  localStorage.setItem(MOCK_PROFILES_KEY, JSON.stringify(profiles));
  
  // Also update the regular profiles storage for compatibility
  localStorage.setItem('profiles', JSON.stringify(profiles));
  
  return newProfile;
};

// Get all profiles for the current user
export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const profiles = await authFetch('/profiles');
    // Update profiles in localStorage for consistency
    localStorage.setItem('profiles', JSON.stringify(profiles));
    return profiles;
  } catch (error) {
    // Fallback to mock profiles when API fails
    console.log('Using mock profiles as fallback');
    return getMockProfiles();
  }
};

// Get a single profile by ID
export const getProfile = async (profileId: string): Promise<Profile> => {
  try {
    return await authFetch(`/profiles/${profileId}`);
  } catch (error) {
    // Fallback to mock profile
    return getMockProfile(profileId);
  }
};

// Create a new profile
export const createProfile = async (profileData: Partial<Profile>): Promise<Profile> => {
  try {
    const newProfile = await authFetch('/profiles', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
    
    // Update the profiles list in localStorage to include this new profile
    try {
      const existingProfilesJSON = localStorage.getItem('profiles');
      if (existingProfilesJSON) {
        const existingProfiles = JSON.parse(existingProfilesJSON);
        existingProfiles.push(newProfile);
        localStorage.setItem('profiles', JSON.stringify(existingProfiles));
      }
    } catch (e) {
      console.error("Failed to update profiles in localStorage:", e);
    }
    
    return newProfile;
  } catch (error) {
    // Fallback to mock profile creation
    return createMockProfile(profileData);
  }
};

// Update a profile
export const updateProfile = async (profileId: string, profileData: Partial<Profile>): Promise<Profile> => {
  try {
    return await authFetch(`/profiles/${profileId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  } catch (error) {
    // Mock implementation for updating profile locally
    const profiles = getMockProfiles();
    const profileIndex = profiles.findIndex(p => p.id === profileId);
    
    if (profileIndex >= 0) {
      profiles[profileIndex] = {
        ...profiles[profileIndex],
        ...profileData
      };
      localStorage.setItem(MOCK_PROFILES_KEY, JSON.stringify(profiles));
      localStorage.setItem('profiles', JSON.stringify(profiles));
      return profiles[profileIndex];
    }
    
    throw new Error(`Profile with ID ${profileId} not found`);
  }
};

// Delete a profile
export const deleteProfile = async (profileId: string): Promise<void> => {
  try {
    return await authFetch(`/profiles/${profileId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    // Mock implementation for deleting profile locally
    const profiles = getMockProfiles();
    const filteredProfiles = profiles.filter(p => p.id !== profileId);
    
    if (filteredProfiles.length === profiles.length) {
      throw new Error(`Profile with ID ${profileId} not found`);
    }
    
    localStorage.setItem(MOCK_PROFILES_KEY, JSON.stringify(filteredProfiles));
    localStorage.setItem('profiles', JSON.stringify(filteredProfiles));
  }
};

// Add content to watchlist
export const addToWatchlist = async (profileId: string, contentId: string) => {
  try {
    return await authFetch(`/profiles/${profileId}/watchlist`, {
      method: 'POST',
      body: JSON.stringify({ contentId })

    });
  } catch (error) {
    // Mock implementation could be added here
   try {
    
    const MovieDetails = await fetchMovieById(contentId);

    const watchlist = getMockWatchlist(profileId);

const currentItems = watchlist.map(item => item.content || item);

if(!currentItems.some(item => item.id === contentId)) {
  const rawWatchlist = getMockWatchlist(profileId).map(item => item.content || item);
  rawWatchlist.push(MovieDetails);
  saveMockWatchList(profileId, rawWatchlist);
}

return { success: true };


  }
  catch (fetchError) {
    console.error("Error fetching movie details:", fetchError);
    throw fetchError;
  }
}
};

// Get profile watchlist
export const getWatchlist = async (profileId: string) => {
  try {
    return await authFetch(`/profiles/${profileId}/watchlist`);
  } catch (error) {
    // Mock implementation could be added here
    console.log('Mock implementation for getWatchlist needed');
    return getMockWatchlist(profileId);
  }
};

export const removeFromWatchlist = async (profileId: string, contentItemId: string) => {
  try {
    return await authFetch(`/profiles/${profileId}/watchlist/${contentItemId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    // Implement mock removal
    const watchlist = getMockWatchlist(profileId)
      .map(item => item.content || item) // Extract content items
      .filter(item => item.id !== contentItemId); // Filter out the removed item
    
    saveMockWatchList(profileId, watchlist);
    return { success: true };
  }
};

// Update watch history
export const updateWatchHistory = async (profileId: string, contentId: string, watchedDuration: number, completed: boolean) => {
  try {
    return await authFetch(`/profiles/${profileId}/watch-history`, {
      method: 'POST',
      body: JSON.stringify({
        contentId,
        watchedDuration,
        completed
      })
    });
  } catch (error) {
    // Mock implementation could be added here
   try {
    const MovieDetails = await fetchMovieById(contentId);
    const watchHistory = getMockWatchHistory(profileId);

    const existingIndex = watchHistory.findIndex(item => item.contentId === contentId);

    const historyItem = {
      id: `history-${contentId}`,
      contentId,
      profileId,
      watchedDuration,
      completed,
      watchedAt: new Date().toISOString(),
      content: MovieDetails
    };

    if (existingIndex !== -1) {
      // Update existing item
      watchHistory[existingIndex] = historyItem;
    } else {
      // Add new item
      watchHistory.push(historyItem);
    }

    saveMockWatchHistory(profileId, watchHistory);
    return historyItem;
   } catch (fetchError) {
    console.error("Error fetching movie details:", fetchError);
      throw fetchError;
   }
  }
};

// Get continue watching list
export const getContinueWatching = async (profileId: string) => {
  try {
    return await authFetch(`/profiles/${profileId}/continue-watching`);
  } catch (error) {
    // Mock implementation could be added here
    const watchHistory = getMockWatchHistory(profileId);

    return watchHistory
    .filter(item => !item.completed)
    .sort((a, b) => {
      const dateA = new Date(a.watchedAt);
      const dateB = new Date(b.watchedAt);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10);
  }
};