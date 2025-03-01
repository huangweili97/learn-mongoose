interface ShowStatusProps {
  handleContent: (type: string) => void;
}

/**
 * A function to render all the available books.
 * @param param0 the function to set the content type in the parent component.
 * The content type determines what is rendered in the parent component.
 * @returns A button to show the status of all books
 */
export default function ShowStatus({ handleContent }: ShowStatusProps) {
  function handleShowStatus() {
    handleContent('available');
  }

  return (
    <button onClick={handleShowStatus}>Show Status</button>
  );
}
