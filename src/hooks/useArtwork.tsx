import { useState, useEffect } from 'react';

interface ArtworkData {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  medium_display: string;
  place_of_origin: string;
  department_title: string;
  image_id: string;
  dimensions: string;
  credit_line: string;
}

export const useArtwork = () => {
  const [artworks, setArtworks] = useState<ArtworkData[]>([]);
  const [currentArtwork, setCurrentArtwork] = useState<ArtworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch 100 artworks with image data
      const response = await fetch(
        'https://api.artic.edu/api/v1/artworks?limit=100&fields=id,title,artist_display,date_display,medium_display,place_of_origin,department_title,image_id,dimensions,credit_line'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch artworks');
      }
      
      const data = await response.json();
      
      // Filter artworks that have images
      const artworksWithImages = data.data.filter((artwork: ArtworkData) => 
        artwork.image_id && artwork.title
      );
      
      setArtworks(artworksWithImages);
      
      // Set initial random artwork
      if (artworksWithImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * artworksWithImages.length);
        setCurrentArtwork(artworksWithImages[randomIndex]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getRandomArtwork = () => {
    if (artworks.length > 0) {
      const randomIndex = Math.floor(Math.random() * artworks.length);
      setCurrentArtwork(artworks[randomIndex]);
    }
  };

  return {
    artworks,
    currentArtwork,
    loading,
    error,
    getRandomArtwork,
    refetch: fetchArtworks
  };
};