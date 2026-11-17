import { useState } from "react";

const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Fiction" },
  { id: 2, title: "Dune", author: "Frank Herbert", year: 1965, genre: "Science" },
  { id: 3, title: "The Diary of a Young Girl", author: "Anne Frank", year: 1947, genre: "History" },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", year: 1813, genre: "Fiction" },
  { id: 5, title: "A Brief History of Time", author: "Stephen Hawking", year: 1988, genre: "Science" },
  { id: 6, title: "The Guns of August", author: "Barbara W. Tuchman", year: 1962, genre: "History" },
];

const genres = ["All", "Fiction", "Science", "History"];

function BookShelf() {
  const [activeGenre, setActiveGenre] = useState("All");
  const [oldestFirst, setOldestFirst] = useState(true);

  const filteredBooks = books.filter(
    (book) => activeGenre === "All" || book.genre === activeGenre,
  );
  const visibleBooks = [...filteredBooks].sort((a, b) =>
    oldestFirst ? a.year - b.year : b.year - a.year,
  );

  return (
    <section>
      <h2>Bookshelf</h2>
      <div className="book-controls">
        <div className="genre-buttons">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-button${activeGenre === genre ? " active" : ""}`}
              aria-pressed={activeGenre === genre}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        <button
          className="book-sort-button"
          onClick={() => setOldestFirst((current) => !current)}
        >
          Sort by year ({oldestFirst ? "oldest first" : "newest first"})
        </button>
      </div>

      {visibleBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul className="book-list">
          {visibleBooks.map((book) => (
            <li className="book-card" key={book.id}>
              <h3>{book.title}</h3>
              <p>By {book.author}</p>
              <p>{book.year} · {book.genre}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default BookShelf;
