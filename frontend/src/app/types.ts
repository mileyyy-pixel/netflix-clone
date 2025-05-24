// app/types.ts
export interface Profile {
   
    id: string;
    name: string;
    avatarUrl: string;
    isKidsProfile: boolean;
  }
  
  export interface Content {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
    releaseYear: number;
    ageRating: string;
    duration: number;
    genres: string[];
    featured?: boolean;
  }
  
  export interface WatchHistoryItem {
    id: string;
    contentId: string;
    profileId: string;
    watchedDuration: number;
    completed: boolean;
    watchedAt: string;
  }