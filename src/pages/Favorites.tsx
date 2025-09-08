import { Button } from "@/components/ui/button";
import { ArtworkCard } from "@/components/ArtworkCard";
import { useFavorites } from "@/hooks/useFavorites";
import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link to="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="font-serif text-5xl lg:text-6xl text-gallery-charcoal mb-4">
              Your Favorites
            </h1>
            <p className="text-xl text-gallery-warm-gray">
              {favorites.length === 0 
                ? "You haven't saved any artworks yet" 
                : `${favorites.length} masterpiece${favorites.length === 1 ? '' : 's'} saved`
              }
            </p>
          </div>
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-gallery-warm-gray mx-auto mb-4" />
            <p className="text-gallery-warm-gray text-lg mb-6">
              Start exploring the collection and save your favorite artworks
            </p>
            <Link to="/">
              <Button size="lg" className="bg-gallery-navy hover:bg-gallery-charcoal text-gallery-white">
                Discover Artworks
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {favorites.map((artwork) => (
              <div key={artwork.id} className="gallery-fade-in">
                <ArtworkCard artwork={artwork} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;