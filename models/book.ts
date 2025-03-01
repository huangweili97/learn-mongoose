import mongoose, { Schema, Document, Model, FilterQuery } from 'mongoose';
import Author, { IAuthor } from './author';
import Genre, { IGenre } from './genre';

/**
 * Interface representing a book document in the collection.
 * Defines instance methods that operate on individual documents.
 */
export interface IBook extends Document {
  title: string;
  author: IAuthor;
  summary: string;
  isbn: string;
  genre: IGenre[];
  saveBookOfExistingAuthorAndGenre(author_family_name: string, author_first_name: string, genre_name: string, title: string): Promise<IBook>;
}

/**
 * Interface representing static methods for the book model.
 * These methods operate on the collection as a whole.
 */
interface IBookModel extends Model<IBook> {
  getAllBooksWithAuthors(projectionOpts: string, sortOpts?: { [key: string]: 1 | -1 }): Promise<IBook[]>;
  getBookCount(filter?: FilterQuery<IBook>): Promise<number>;
  getBooksWithAuthors(): Promise<IBook[]>; // ✅ New static method added
}

/**
 * Mongoose schema defining the book collection structure.
 */
const BookSchema: Schema<IBook> = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }]
});

/**
 * Retrieves all books with populated author information.
 * Only `title` and `author` fields are included in the results.
 * @returns {Promise<IBook[]>} A list of books with their authors' names.
 */
BookSchema.statics.getBooksWithAuthors = async function (): Promise<IBook[]> {
  return this.find().populate('author', 'name').select('title author');
};

/**
 * Retrieves all books with author details in a sorted order if specified.
 * @param projection The fields to select.
 * @param sortOpts An optional sorting order.
 * @returns A promise resolving to an array of books.
 */
BookSchema.statics.getAllBooksWithAuthors = async function (projection: string, sortOpts?: { [key: string]: 1 | -1 }): Promise<IBook[]> {
  if (sortOpts) {
    return this.find({}, projection).sort(sortOpts).populate('author');
  }
  return this.find({}, projection).populate('author');
};

/**
 * Counts the total number of books in the collection, applying an optional filter.
 * @param filter The optional filter criteria.
 * @returns A promise resolving to the count of books.
 */
BookSchema.statics.getBookCount = async function (filter?: FilterQuery<IBook>): Promise<number> {
  return this.countDocuments(filter || {});
};

/**
 * Saves a new book for an existing author and genre.
 * @param author_family_name The last name of the author.
 * @param author_first_name The first name of the author.
 * @param genre_name The genre name.
 * @param title The title of the book.
 * @returns A promise resolving to the saved book document.
 */
BookSchema.methods.saveBookOfExistingAuthorAndGenre = async function (
  author_family_name: string,
  author_first_name: string,
  genre_name: string,
  title: string
): Promise<IBook> {
  const authorId = await Author.getAuthorIdByName(author_family_name, author_first_name);
  const genreId = await Genre.getGenreIdByName(genre_name);
  if (!authorId || !genreId) {
    throw new Error('Author or genre not found');
  }
  this.title = title;
  this.summary = 'Demo Summary to be updated later';
  this.isbn = 'ISBN2022';
  this.author = authorId;
  this.genre = [genreId];
  return await this.save();
};

/**
 * Compiles the schema into a Mongoose model and exports it.
 * Ensures the model supports both instance and static methods.
 */
const Book = mongoose.model<IBook, IBookModel>('Book', BookSchema);
export default Book;
