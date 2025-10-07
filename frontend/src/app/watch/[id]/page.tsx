"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Volume2, VolumeX, Maximize, Pause, Play } from 'lucide-react';

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState<{
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    videos: {
      results: Array<{
        type: string;
        site: string;
        key: string;
      }>;
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const movieId = params.id;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  const getYoutubeVideoKey = () => {
    if (!movie?.videos?.results || movie.videos.results.length === 0) {
      return null;
    }
    
    // Try to find a trailer first
    const trailer = movie.videos.results.find(
      (video: { type: string; site: string; key: string }) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    
    // If no trailer, just use the first YouTube video
    const anyVideo = movie.videos.results.find(
      (video: { site: string; key: string }) => video.site === 'YouTube'
    );
    
    return trailer?.key || anyVideo?.key || null;
  };

  const handleBack = () => {
    router.back();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    const videoElement = document.querySelector('.video-container');
    if (videoElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoElement.requestFullscreen();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="loader"></div>
      </div>
    );
  }

  const videoKey = getYoutubeVideoKey();
  
  return (
    <div className="relative h-screen w-full bg-black">
      <div className="absolute top-0 left-0 p-4 z-50">
        <button 
          onClick={handleBack} 
          className="text-white bg-black/30 p-2 rounded-full hover:bg-black/50 transition"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      
      <div className="video-container relative w-full h-full">
        {videoKey ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&showinfo=0&rel=0&loop=1${isPlaying ? '' : '&pause=1'}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white">
            <img 
              src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`} 
              alt={movie?.title}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative z-10 text-center p-4">
              <h1 className="text-3xl font-bold mb-4">{movie?.title}</h1>
              <p className="text-xl">No video available for streaming</p>
              <p className="mt-4 text-lg max-w-2xl">{movie?.overview}</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={togglePlay}
              className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button 
              onClick={toggleMute}
              className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <div className="text-white text-lg ml-4">
              {movie?.title}
            </div>
          </div>
          <button 
            onClick={handleFullscreen}
            className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          >
            <Maximize size={24} />
          </button>
        </div>
      </div>
    </div>
  );
} 