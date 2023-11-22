const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const path = require("path");
const EmployeeModel = require("./models/Employee");
const Book = require("./models/Book");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Multer configuration for book thumbnails
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint to serve book thumbnails
app.use('/thumbnails', express.static(path.join(__dirname, 'uploads')));

// Route to add a new book with image upload
app.post("/Add", upload.single('thumbnail'), async (req, res) => {
  try {
    const { bookname, author, publishedyear, pages } = req.body;
    const thumbnail = req.file;

    const book = await Book.create({
      bookname,
      author,
      publishedyear,
      pages,
      thumbnail: thumbnail ? `/thumbnails/${thumbnail.filename}` : null,
    });

    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to get all books
app.get("/Dashboard", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching books" });
  }
});

app.get('/Dashboard/:id', async (req, res) => {
  const bookid = req.params.id;

  try {
    const book = await Book.findById(bookid);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching the book' });
  }
});

app.put('/Dashboard/:id', async (req, res) => {
  const { id } = req.params;
  const { bookname, author, publishedyear } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { bookname, author, publishedyear },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/Dashboard/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleteBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    return res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to get all books with thumbnails
app.get("/cards", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching books" });
  }
});

// Route for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("password is incorrect");
      }
    } else {
      res.json("user not existing");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for user registration
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employee) => res.json(employee))
    .catch((err) => res.status(500).json({ error: err }));
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
