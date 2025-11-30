const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query, maxResults = 20) => {
  try {
    const res = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}&printType=books`
    );
    if (!res.ok){
        throw new Error("Failed fetching books");
    }

    const data = await res.json();
    return data.items || [];
    
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
};

export const fetchBooksByCategory = async (category, maxResults = 20) => {
  return searchBooks(`subject:${category}`, maxResults);
};

export const fetchPopularBooks = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}?q=bestseller&orderBy=newest&maxResults=10&printType=books`
    );
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
