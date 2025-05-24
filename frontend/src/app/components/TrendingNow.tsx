"use client";
import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TrendingNowProps {
  className?: string;
}

const TrendingNow = ({ className = "" }: TrendingNowProps) => {
  const [movies, setMovies] = useState<{ id: number; poster_path: string; title: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API Response:", data.results);
        
        if (data.results && data.results.length > 0) {
          setMovies(data.results.slice(0, 10));
        } else {
          throw new Error("No movies returned from API");
        }
      } catch (error) {
        console.error("Error loading trending movies:", error);
        setMovies([
          { id: 1, title: "Fallback Movie 1", poster_path: "/fallback1.jpg" },
          { id: 2, title: "Fallback Movie 2", poster_path: "/fallback2.jpg" },
          { id: 3, title: "Fallback Movie 3", poster_path: "/fallback3.jpg" },
          { id: 4, title: "Fallback Movie 4", poster_path: "/fallback4.jpg" },
          { id: 5, title: "Fallback Movie 5", poster_path: "/fallback5.jpg" },
        ]);
        setError("Failed to load trending movies - using sample data");
      } finally {
        setIsLoading(false);
      }
    }
    loadMovies();
  }, []);

  const updateScrollButtons = () => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const maxScroll = scrollElement.scrollWidth - scrollElement.clientWidth;
      const currentScroll = Math.round(scrollElement.scrollLeft);
      
      setShowLeftButton(currentScroll > 10);
      setShowRightButton(currentScroll < maxScroll - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -1200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 1200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const handleUpdate = () => {
        requestAnimationFrame(updateScrollButtons);
      };
      
      scrollElement.addEventListener("scroll", handleUpdate);
      window.addEventListener("resize", handleUpdate);
      
      handleUpdate();

      return () => {
        scrollElement.removeEventListener("scroll", handleUpdate);
        window.removeEventListener("resize", handleUpdate);
      };
    }
  }, []);

  if (isLoading) {
    return (
      <div className={`p-6 -mt-8 ${className}`}>
        <h2 className="text-2xl font-bold text-white mb-5 text-left">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-700 rounded-md h-[300px]"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 -mt-8 ${className}`}>
        <h2 className="text-2xl font-bold text-white mb-4 text-left">Trending Now</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div 
      className={`p-6 relative -mt-8 ${className}`} 
      style={{ 
        backgroundColor: '#000', 
        position: 'relative',
        zIndex: 999 
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-5 text-left">Trending Now</h2>

      <div className="max-w-[1200px] mx-auto relative" style={{ zIndex: 999 }}>
        {showLeftButton && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white w-8 h-12 rounded-r backdrop-blur-sm transition-all duration-200 z-[999] flex items-center justify-center group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 transition-transform group-hover:scale-110" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="overflow-x-scroll flex space-x-10 scroll-smooth snap-x snap-mandatory px-1 relative"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            backgroundColor: '#000',
            zIndex: 999,
            willChange: 'transform'
          }}
          onScroll={(e) => requestAnimationFrame(updateScrollButtons)}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="relative flex-shrink-0 w-[200px] h-[300px] rounded-md overflow-hidden group snap-center"
              style={{ 
                backgroundColor: '#111',
                willChange: 'transform',
                zIndex: 999,
                position: 'relative'
              }}
            >
              <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xl font-bold px-3 py-1 rounded-md z-[1000]">
                {index + 1}
              </span>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover rounded-md transition-transform group-hover:scale-105"
                style={{ 
                  display: 'block',
                  willChange: 'transform',
                  position: 'relative',
                  zIndex: 998
                }}
                loading="eager"
                onError={(e) => console.error('Image failed to load:', e)}
              />
            </div>
          ))}
        </div>

        {showRightButton && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white w-8 h-12 rounded-l backdrop-blur-sm transition-all duration-200 z-[999] flex items-center justify-center group"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 transition-transform group-hover:scale-110" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TrendingNow;