#!/bin/bash

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null
then
    echo "MongoDB is not running. Please start MongoDB and try again."
    exit 1
fi

# Run the Node.js script
echo "Running the fetchBooks.js script..."

# Make sure to replace 'fetchBooks.js' with the actual name and path of your Node.js file
node server/create-books-in-db-from-remote.js

# Check if the script succeeded
if [ $? -eq 0 ]; then
    echo "Books fetched and saved successfully!"
else
    echo "There was an error fetching or saving books."
    exit 1
fi
