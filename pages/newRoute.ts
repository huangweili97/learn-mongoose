import express, { Request, Response } from 'express';
import Book from '../models/book';

const router = express.Router();

/**
 * @route GET /api/new-endpoint
 * @group Books
 * @returns {object} 200 - Returns a list of books with their titles and authors.
 * @returns {Error} 500 - If an error occurs while fetching the books.
 */
router.get('/new-endpoint', async (_: Request, res: Response) => {
  try {
    const books = await Book.getBooksWithAuthors();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    const errMsg = (error as Error).message || 'Unknown error occurred';
    res.status(500).json({ success: false, message: errMsg });
  }
});

export default router;
