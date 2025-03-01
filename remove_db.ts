import mongoose, { Connection } from 'mongoose';

// Pass URL of your MongoDB instance as the first argument
const userArgs: string[] = process.argv.slice(2);
const mongoDB: string = userArgs[0];

// Connect to MongoDB
mongoose.connect(mongoDB)
    .then(() => {
        const db: Connection = mongoose.connection;

        // Handle connection errors
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        // Function to clear the database
        const clearDatabase = async () => {
            try {
                // Clear each collection
                await db.dropDatabase();

                console.log('Database cleared');
            } catch (err) {
                console.log('ERROR: ' + err);
            } finally {
                // Close the database connection
                db.close();
            }
        }

        // Run the function to clear the database
        clearDatabase().catch((err) => {
            console.log('ERROR: ' + err);
            db.close();
        });

    })
    .catch(err => {
        console.log('ERROR: ' + err);
    });

console.log('Processing ...');
