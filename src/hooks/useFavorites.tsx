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

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<ArtworkData[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('artworkFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (artwork: ArtworkData) => {
    const updatedFavorites = [...favorites, artwork];
    setFavorites(updatedFavorites);
    localStorage.setItem('artworkFavorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (artworkId: number) => {
    const updatedFavorites = favorites.filter(artwork => artwork.id !== artworkId);
    setFavorites(updatedFavorites);
    localStorage.setItem('artworkFavorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (artworkId: number) => {
    return favorites.some(artwork => artwork.id === artworkId);
  };

  const toggleFavorite = (artwork: ArtworkData) => {
    if (isFavorite(artwork.id)) {
      removeFromFavorites(artwork.id);
    } else {
      addToFavorites(artwork);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
};