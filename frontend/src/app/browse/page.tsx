'use client';

import React, {useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {Profile} from "../types";
import { fetchTrendingMovies, fetchMoviesByGenre } from "../api/movies";
import { getWatchlist, getContinueWatching, addToWatchlist, removeFromWatchlist } from "../api/profiles";

interface Movie {
    id: string;
    title: string;
    poster_path: string;
    backdropPath?: string;
    overview?: string;
    releaseDate?: string;
    voteAverage?: number;
}

const GENRES = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 27, name: 'Horror' },
    { id: 18, name: 'Drama' },
    { id: 10749, name: 'Romance' }
];

export default function BrowsePage() {
    const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [genreMovies, setGenreMovies] = useState<{ [key: number]: Movie[] }>({});
    const [continueWatching, setContinueWatching] = useState<Movie[]>([]);
    const [watchlist, setWatchlist] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
    const [isNavTransparent, setIsNavTransparent] = useState(true);
    const router = useRouter();
    
    // Fixed useRef declarations
    const trendingRef = useRef<HTMLDivElement | null>(null) as React.RefObject<HTMLDivElement>;
    const continueWatchingRef = useRef<HTMLDivElement | null>(null) as React.RefObject<HTMLDivElement>;
    
    // Create an object to store refs for each genre
    const genreRefs = useRef<{[key: number]: React.RefObject<HTMLDivElement | null>}>({});

    // Initialize genre refs
    useEffect(() => {
        GENRES.forEach(genre => {
            genreRefs.current[genre.id] = React.createRef<HTMLDivElement>();
        });
    }, []);

    useEffect(() => {
        const handlescroll = () => {
            if(window.scrollY > 50) {
                setIsNavTransparent(false);
            } else {
                setIsNavTransparent(true);
            }
        };

        window.addEventListener('scroll', handlescroll);
        
        return () => window.removeEventListener('scroll', handlescroll);
    }, []);

    useEffect(() => {
        const storedProfile = localStorage.getItem("active-profile");
        if(!storedProfile) {
            router.push("/profiles");
            return;
        }

        const profile = JSON.parse(storedProfile) as Profile;
        setActiveProfile(profile);

        async function loadContent() {
            try {
                setLoading(true);

                const trending = await fetchTrendingMovies();
                setTrendingMovies(trending);    

                if (trending && trending.length > 0) {
                    setHeroMovie(trending[0]);
                }

                const genreData: {[key: number]: Movie[]} = {};
                for(const genre of GENRES) {
                    const movies = await fetchMoviesByGenre(genre.id);
                    genreData[genre.id] = movies;
                }
                setGenreMovies(genreData);

                try {
                    const watchlistData = await getWatchlist(profile.id);
                    setWatchlist(watchlistData);
                } catch (error) {
                    console.error("Failed to load watchlist", error);
                    setWatchlist([]);
                }

                try {
                    const continueWatchingData = await getContinueWatching(profile.id);
                    setContinueWatching(continueWatchingData);
                } catch (error) {
                    console.error("Failed to load continue watching", error);
                    setContinueWatching([]);
                }
                setLoading(false);
            }
            catch(error) {
                console.error("Failed to load browse page", error);
                setError("Something went wrong. Please try again later.");
                setLoading(false);
            }
        }
        loadContent();
    }, [router]);

    // Scroll functions for sliders
    const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
        if (ref.current) {
            const scrollAmount = ref.current.clientWidth * 0.8; // Scroll 80% of the visible width
            if (direction === 'left') {
                ref.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const handleAddToWatchlist = async (movie: Movie) => {
        if(!activeProfile?.id) return;

        try {
            await addToWatchlist(activeProfile.id, movie.id);
            setWatchlist([...watchlist, movie]);
        } catch (error) {
            console.error("Failed to add to watchlist", error);
        }
    };

    const handleRemoveFromWatchlist = async (movieId: string) => {
        if(!activeProfile?.id) return;

        try {
            await removeFromWatchlist(activeProfile.id, movieId);
            setWatchlist(watchlist.filter(movie => movie.id !== movieId));
        } catch (error) {
            console.error("Failed to remove from watchlist", error);
        }
    };

    const IsInWatchList = (movieId: string) => {
        return watchlist.some(movie => movie.id === movieId);
    };

    const handlePlayMovie = (movieId: string) => {
        router.push(`/watch/${movieId}`);
    };

    const handleOpenDetails = (movieId: string) => {
        router.push(`/movie/${movieId}`);
    };

    // Row component for cleaner code
    const MovieRow = ({ 
        title, 
        movies, 
        sliderRef, 
        rowKey 
    }: { 
        title: string, 
        movies: Movie[], 
        sliderRef: React.RefObject<HTMLDivElement>,
        rowKey: string
    }) => (
        <div className="mb-12 relative">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            
            {/* Navigation Controls */}
            <div className="absolute top-0 right-0 flex space-x-2">
                <button 
                    onClick={() => scroll(sliderRef, 'left')}
                    className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-opacity z-10"
                    aria-label="Scroll left"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    onClick={() => scroll(sliderRef, 'right')}
                    className="bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-80 transition-opacity z-10"
                    aria-label="Scroll right"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            
            {/* Movie Row */}
            <div 
                ref={sliderRef} 
                className="flex space-x-4 overflow-x-hidden pb-4 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {movies.map((movie) => (
                    <div key={`${rowKey}-${movie.id}`} className="flex-shrink-0 w-64 relative group">
                        <div className="relative h-36 w-full">
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover rounded"
                            />
                            {rowKey === 'continue' && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                                    <div className="h-full bg-red-600 w-1/2"></div> {/* Progress bar */}
                                </div>
                            )}
                        </div>
                        <div className="p-2">
                            <h3 className="text-sm font-medium truncate">{movie.title}</h3>
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-70 group-hover:opacity-100 rounded flex items-center justify-center transition-all duration-200">
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => handlePlayMovie(movie.id)}
                                    className="bg-white rounded-full p-2 text-black hover:bg-opacity-80"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => IsInWatchList(movie.id) ? handleRemoveFromWatchlist(movie.id) : handleAddToWatchlist(movie)}
                                    className="bg-white rounded-full p-2 text-black hover:bg-opacity-80"
                                >
                                    {IsInWatchList(movie.id) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                                <button 
                                    onClick={() => handleOpenDetails(movie.id)}
                                    className="bg-white rounded-full p-2 text-black hover:bg-opacity-80"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-red-500 text-2xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isNavTransparent ? 'bg-transparent' : 'bg-black'}`}>
                <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="cursor-pointer">
                                <Image
                                    src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
                                    alt="Netflix"
                                    width={120}
                                    height={32}
                                    priority
                                />
                            </span>
                        </Link>

                        <nav className="hidden md:flex space-x-6">
                            <Link href="/browse" className="text-white hover:text-gray-300">Home</Link>
                            <Link href="/browse/tv" className="text-white hover:text-gray-300">TV Shows</Link>
                            <Link href="/browse/movies" className="text-white hover:text-gray-300">Movies</Link>
                            <Link href="/browse/new" className="text-white hover:text-gray-300">New & Popular</Link>
                            <Link href="/browse/mylist" className="text-white hover:text-gray-300">My List</Link>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-black bg-opacity-75 text-white py-1 px-3 rounded border border-gray-600 focus:outline-none hidden md:block"
                            />
                        </div>
                        {activeProfile && (
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <Image
                                    src={activeProfile.avatarUrl || "/default.png"}
                                    alt={activeProfile.name}
                                    width={32}
                                    height={32}
                                    className="rounded"
                                />
                                <span className="text-sm hidden md:inline">{activeProfile.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {heroMovie && (
                <div className="relative h-screen w-full">
                    <div className="absolute inset-0">
                        <Image
                            src={`https://image.tmdb.org/t/p/original${heroMovie.backdropPath || heroMovie.poster_path}`}
                            alt={heroMovie.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-1/4 left-12 max-w-2xl z-10">
                        <h1 className="text-5xl font-bold mb-4">{heroMovie.title}</h1>
                        <p className="text-lg mb-6">{heroMovie.overview}</p>
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => handlePlayMovie(heroMovie.id)}
                                className="bg-white text-black py-2 px-8 rounded flex items-center hover:bg-opacity-80 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                Play
                            </button>
                            <button 
                                onClick={() => handleOpenDetails(heroMovie.id)}
                                className="bg-gray-500 bg-opacity-70 text-white py-2 px-8 rounded flex items-center hover:bg-opacity-80 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="px-12">
                {/* Continue Watching Section */}
                {continueWatching.length > 0 && (
                    <div className="-mt-16 relative z-20">
                        <MovieRow 
                            title="Continue Watching" 
                            movies={continueWatching} 
                            sliderRef={continueWatchingRef} 
                            rowKey="continue" 
                        />
                    </div>
                )}

                {/* Trending Now Section */}
                <MovieRow 
                    title="Trending Now" 
                    movies={trendingMovies} 
                    sliderRef={trendingRef} 
                    rowKey="trending" 
                />

                {/* Genre Sections */}
                {GENRES.map((genre) => (
                    <MovieRow 
                        key={genre.id}
                        title={genre.name} 
                        movies={genreMovies[genre.id] || []} 
                        sliderRef={genreRefs.current[genre.id] || React.createRef()} 
                        rowKey={`genre-${genre.id}`} 
                    />
                ))}
            </div>
        </div>
    );
}