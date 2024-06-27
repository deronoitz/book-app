import { useEffect, useState } from "react";
import { useToast } from "@/components/shared/Toast/ToastContext";
import type { BookItemType } from "@/entities/Book";

interface BooksHookProps {
  handleSetFavorite: () => void;
  isFavorite: boolean;
}

export const useBooks = (book: BookItemType): BooksHookProps => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { showToast } = useToast();

  function handleSetFavorite() {
    // Checking favorites data from localStorage
    const favoriteState = localStorage.getItem("favorites") || "[]";
    const favoriteObject = JSON.parse(favoriteState);
    let newFavorites = [];

    if (isFavorite) {
      newFavorites = favoriteObject.filter(
        (item: BookItemType) => item.id !== book.id
      );
    } else {
      newFavorites = [...favoriteObject, book];
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    // Need to set to react state because localStorage is not reactive
    setIsFavorite(!isFavorite);
    showToast(
      !isFavorite
        ? `${book.title} added to Favorites!`
        : `${book.title} removed from Favorites!`
    );
  }

  // Checking localStorage whether the item is in favorite or not
  useEffect(() => {
    const favoriteState: string =
      typeof document !== "undefined" // This condition is must because localStorage only ready when browser is ready
        ? localStorage.getItem("favorites") || "[]"
        : "[]";
    const favoriteObject = JSON.parse(favoriteState);
    const isItemFavorite = favoriteObject.find(
      (item: BookItemType) => item.id === book.id
    );

    setIsFavorite(!!isItemFavorite);
  }, []);

  return {
    handleSetFavorite,
    isFavorite,
  };
};
