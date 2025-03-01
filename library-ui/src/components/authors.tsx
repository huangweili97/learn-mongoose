interface ViewAuthorProps {
  handleContent: (type: string) => void;
}

/**
 * The component renders a button that allows the user to view all authors in the database.
 * @param param0 a function to set the content string type in the parent component
 * the content string type determines the content to be rendered in the parent component
 * @returns a component that renders a button to view all authors.
 */
export default function ViewAuthor({ handleContent }: ViewAuthorProps) {
  function handleViewAuthors() {
    handleContent('authors');
  }

  return (
    <button onClick={handleViewAuthors}>View Authors</button>
  );
}
