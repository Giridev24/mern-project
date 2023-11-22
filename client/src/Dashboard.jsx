import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState();
  const [updateTitle, setUpdateTitle] = useState();
  const [updateAuthor, setUpdateAuthor] = useState();
  const [updatePublishedYear, setUpdatePublishedYear] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/Dashboard")
      .then((res) => {
       console.log("datafetched successfully", res.data)
       setBooks(res.data)
      })
      .catch((error) => console.error("Error fetching books: ", error));
  }, []);

  const handleEdit = (id) => {
    axios
      .get(`http://localhost:3001/Dashboard/${id}`)
      .then((res) => {
        setUpdateTitle(res.data.bookname);
        setUpdateAuthor(res.data.author);
        setUpdatePublishedYear(res.data.publishedyear);
      })
      .catch((error) => console.error("Error fetching books: ", error));
    setEditId(id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/Dashboard/${id}`)
      .then((res) => {
        console.log("List deleted successfully");
  
        // Update the local state by creating a new array without the deleted book
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting list:", error);
      });
  };
  

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3001/Dashboard/${editId}`, {
        bookname: updateTitle,
        author: updateAuthor,
        publishedyear: updatePublishedYear,
      })
      .then((res) => {
        // Update the local state instead of reloading the page
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === editId
              ? { ...book, bookname: updateTitle, author: updateAuthor, publishedyear: updatePublishedYear }
              : book
          )
        );

        // Reset the editId and update fields
        setEditId(null);
        setUpdateTitle("");
        setUpdateAuthor("");
        setUpdatePublishedYear("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container d fadeInUp-animation">
      <div className="dash border">
        <div className="row heading  border-bottom">
          <div className="col d-flex align-items-center justify-content-between p-2 px-3">
            <h4 className="m-0">Dashboard</h4>
            <Link to="/add">
             <span> <button className="btn btn-success">AddBook</button> </span>
            </Link>
          </div>
        </div>
        <div className="row  m-2">
          <div className="col">
            <table className="table w-100">
              <thead className="thead-dark">
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Year</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book._id}>
                    <td>
                      <span>{index+1}</span>
                    </td>
                    <td>
                      {book._id === editId ? (
                        <input
                          type="text"
                          value={updateTitle}
                          onChange={(e) => setUpdateTitle(e.target.value)}
                        />
                      ) : (
                        book.bookname
                      )}
                    </td>
                    <td>
                      {book._id === editId ? (
                        <input
                          type="text"
                          value={updateAuthor}
                          onChange={(e) => setUpdateAuthor(e.target.value)}
                        />
                      ) : (
                        book.author
                      )}
                    </td>
                    <td>
                      {book._id === editId ? (
                        <input
                          type="text"
                          value={updatePublishedYear}
                          onChange={(e) => setUpdatePublishedYear(e.target.value)}
                        />
                      ) : (
                        book.publishedyear
                      )}
                    </td>
                    <td>
                      {book._id === editId ? (
                        <button onClick={handleUpdate} className="btn btn-dark btn-sm shadow">
                          Update
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(book._id)}
                            className="btn btn-primary py-0 px-2 me-2 mb-1 mb-md-0 "
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger py-0 px-2" onClick={() => handleDelete(book._id)}>Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
