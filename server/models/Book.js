const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedyear: {
    type: Number,
    required: true
  },
  pages: {
    type: String,
    required: true
  },
  // Modify the image field to store binary image data
  image: {
    data: Buffer, // Use the Buffer data type to store binary data
    contentType: String // Store the image's content type (e.g., 'image/jpeg', 'image/png')
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
