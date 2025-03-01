// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import homeRouter from './pages/home';
// import availableRouter from './pages/books_status';
// import bookRouter from './pages/books';
// import authorRouter from './pages/authors';
// import createBookRouter from './pages/create_book';

// // Create express app
// const app = express();
// // Setup server port
// const port = 8000;
// // setup the server to listen on the given port
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// const mongoDB = 'mongodb://127.0.0.1:27017/my_library_db';
// mongoose.connect(mongoDB);
// const db = mongoose.connection;

// // Bind database connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// // when successfully connected log a message
// db.on('connected', () => {
//   console.log('Connected to database');
// });

// /**
//  * Middleware to specify cors policy.
//  * This will intercept every request.
//  * This is unsafe because it trusts all origins.
//  * Do not use this in production.
//  */
// app.use(cors());

// // setup the router middleware for this server
// app.use('/home', homeRouter);

// app.use('/available', availableRouter);

// app.use('/books', bookRouter);

// app.use('/authors', authorRouter);

// app.use('/newbook', createBookRouter);
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import homeRouter from './pages/home';
import availableRouter from './pages/books_status';
import bookRouter from './pages/books';
import authorRouter from './pages/authors';
import createBookRouter from './pages/create_book';
import newRouteHandler from './pages/newRoute'; // Import the new route

// Create express app
const app = express();
// Setup server port
const port = 8000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// MongoDB connection
const mongoDB = 'mongodb://127.0.0.1:27017/my_library_db';
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Database connection successful'));

// Middleware for CORS
app.use(cors());

// Setup the router middleware for this server
app.use('/home', homeRouter);
app.use('/available', availableRouter);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/newbook', createBookRouter);
app.use('/newroute', newRouteHandler); // Register the new route

// Default Route
app.get('/', (_, res) => {
  res.send(' Welcome to the Library API!');
});

export default app;
