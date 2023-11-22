import React, { useState } from "react";
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom"; 
import './Add.css'

const Add = () => {
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedyear, setPublishedyear] = useState("");
  const [pages, setPages] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const Navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bookname", bookname);
    formData.append("author", author);
    formData.append("publishedyear", publishedyear);
    formData.append("pages", pages);
    formData.append("thumbnail", thumbnail);

    axios
      .post("http://localhost:3001/Add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        Navigate('/Dashboard'); 
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container a">
      <div className="form">
        <div className="row heading border-bottom mb-3">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <h4>Add Book Form</h4>
          </div>
        </div>

        <div className="row justify-content-start">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <label htmlFor="bookName" className="form-label">
                  Book Name
                </label>
                <input type="text" onChange={(e) => setBookname(e.target.value)} className="form-control" id="bookName" />
              </div>
              <div className="mb-1">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input type="text" onChange={(e) => setAuthor(e.target.value)} className="form-control" id="author" />
              </div>

              <div className="mb-1">
                <label htmlFor="publishedYear" className="form-label">
                  Published Year
                </label>
                <input type="text" onChange={(e) => setPublishedyear(e.target.value)} className="form-control" id="publishedYear" />
              </div>
              <div className="mb-1">
                <label htmlFor="pages" className="form-label">
                  Pages
                </label>
                <input type="text" onChange={(e) => setPages(e.target.value)} className="form-control" id="pages" />
              </div>
              <div className="mb-1">
                <label htmlFor="thumbnail" className="form-label">
                  Upload a thumbnail image
                </label>
                <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} className="form-control" id="thumbnail" />
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
