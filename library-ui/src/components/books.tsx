interface ViewBooksProps {
  handleContent: (type: string) => void;
}

/**
 * a function to render a button to view all books.
 * @param param0 the function to set the content type in the parent component.
 * @returns a component with a button to view all books
 */
export default function ViewBooks({ handleContent }: ViewBooksProps) {
  function handleViewBooks() {
    handleContent('books');
  }

  return (
    <button onClick={handleViewBooks}>View Books</button>
  );
}
