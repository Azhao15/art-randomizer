import { Button } from "@/components/ui/button";
import { ArtworkCard } from "@/components/ArtworkCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useArtwork } from "@/hooks/useArtwork";
import { useFavorites } from "@/hooks/useFavorites";
import { Shuffle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { currentArtwork, loading, error, getRandomArtwork } = useArtwork();
  const { favorites } = useFavorites();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl lg:text-6xl text-gallery-charcoal mb-4">
              Art Institute of Chicago
            </h1>
            <p className="text-xl text-gallery-warm-gray">
              Loading masterpieces from the collection...
            </p>
          </div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-gallery-charcoal mb-4">
            Something went wrong
          </h1>
          <p className="text-gallery-warm-gray mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl lg:text-6xl text-gallery-charcoal mb-6">
            Art Institute of Chicago
          </h1>
          <p className="text-xl text-gallery-warm-gray mb-8 max-w-2xl mx-auto">
            Discover masterpieces from one of the world's finest art collections. 
            Each click reveals a new treasure from over 300,000 works of art.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={getRandomArtwork}
              size="lg"
              className="bg-gallery-navy hover:bg-gallery-charcoal text-gallery-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <Shuffle className="mr-2 h-5 w-5" />
              Discover New Artwork
            </Button>
            
            <Link to="/favorites">
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3 text-lg font-medium border-gallery-sage text-gallery-sage hover:bg-gallery-sage hover:text-gallery-white transition-all duration-300"
              >
                <Heart className="mr-2 h-5 w-5" />
                My Favorites ({favorites.length})
              </Button>
            </Link>
          </div>
        </div>

        {/* Artwork Display */}
        {currentArtwork && (
          <div className="gallery-fade-in">
            <ArtworkCard artwork={currentArtwork} />
          </div>
        )}
        
        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gallery-warm-gray/20">
          <p className="text-gallery-warm-gray">
            Data provided by the{" "}
            <a 
              href="https://www.artic.edu/open-access/public-api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gallery-sage hover:text-gallery-navy transition-colors underline"
            >
              Art Institute of Chicago Public API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
