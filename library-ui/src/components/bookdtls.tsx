interface BookDetailProps {
  book: string;
  handleContent: (type: string, id?: string) => void;
}

/**
 * A function to render the details of a book.
 * @param param0 props with book string a colon-separated string with the book id, title, and author name
 * and handleContent function to set the content type in the parent component.
 * @returns a component with a button to view the details of a book
 */
export default function BookDetail({ book, handleContent }: BookDetailProps) {
  function handleClick() {
    const bookId = book.split(':')[0].trim();
    handleContent('book_dtls', bookId);
  }

  return (
    <button onClick={handleClick}>View Detail</button>
  );
}
