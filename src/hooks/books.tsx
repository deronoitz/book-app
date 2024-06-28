import { useEffect, useState } from "react";
import { useToast } from "@/components/shared/Toast/ToastContext";
import { useSWRConfig } from "swr";
import type { BookItemType } from "@/entities/Book";
import { endpoints } from "@/apis/interfaces/books";

interface BooksHookProps {
  handleSetFavorite: () => void;
  handleDelete: (id: string | number) => void;
  isFavorite: boolean;
}

type BookItem = BookItemType & { isLocal?: boolean };

export const useBooks = (book: BookItem): BooksHookProps => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { showToast } = useToast();
  const { cache, mutate } = useSWRConfig();

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

  function handleDelete() {
    const recentData = cache.get(endpoints.getBookList)?.data;
    const booksState = localStorage.getItem("books") || "[]";
    const booksObject = JSON.parse(booksState);

    const filteredBooks = booksObject.filter(
      (item: BookItem) => item.id !== book.id
    );

    const newData = recentData.filter((item: BookItem) => item.id !== book.id);

    localStorage.setItem("books", JSON.stringify(filteredBooks));
    mutate(endpoints.getBookList, newData, { revalidate: false });

    showToast(`Deleted ${book.title}!`)
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
  }, [book.id]);

  return {
    handleSetFavorite,
    handleDelete,
    isFavorite,
  };
};
