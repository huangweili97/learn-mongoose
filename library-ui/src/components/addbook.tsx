import axios from 'axios';
import { useState, ChangeEvent } from 'react';

/**
 * The component allows a user to add a new book.
 * A book can only be added if the author and genre exist in the database.
 * The component has four input boxes to get the family name and first name of the author,
 * the name of the genre, and the title of the book.
 * The component makes a POST request to the server with the details of the book.
 * @returns a form to add a new book
 */
export default function AddBook() {
    const [authorFamilyName, setAuthorFamilyName] = useState<string>('');
    const [authorFirstName, setAuthorFirstName] = useState<string>('');
    const [genreName, setGenreName] = useState<string>('');
    const [bookTitle, setBookTitle] = useState<string>('');
    const [msg, setMsg] = useState<string>('');

    function handleFamilyNameChange(e: ChangeEvent<HTMLInputElement>) {
        setAuthorFamilyName(e.target.value);
    }

    function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
        setAuthorFirstName(e.target.value);
    }

    function handleGenreChange(e: ChangeEvent<HTMLInputElement>) {
        setGenreName(e.target.value);
    }

    function handleBookTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setBookTitle(e.target.value);
    }

    function handleClick() {
        const apiUrl = 'http://localhost:8000/newbook';
        const postData = {
            familyName: authorFamilyName,
            firstName: authorFirstName,
            genreName: genreName,
            bookTitle: bookTitle
        };

        // Send a POST request
        axios.post(apiUrl, postData)
            .then(response => {
                // Handle the success response
                setMsg('Response: ' + response.data);
            })
            .catch(error => {
                // Handle errors
                setMsg('Error: ' + error.message);
            });
    }

    return (
        <div>
            <input type="text" placeholder="Family Name" onChange={handleFamilyNameChange} />
            <input type="text" placeholder="First Name" onChange={handleFirstNameChange} />
            <input type="text" placeholder="Genre" onChange={handleGenreChange} />
            <input type="text" placeholder="Book Title" onChange={handleBookTitleChange} />
            <button onClick={handleClick}>Add New Book</button>
            <p>{msg}</p>
        </div>
    );
}
