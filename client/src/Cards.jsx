import React, { useState, useEffect } from 'react';
import './Cards.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';

const Cards = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/cards")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books: ", error);
      });
  }, []);

  return (
    <div className="c">
      <div className="row">
        {books.map((book, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-3">
            <div className="card">
              {/* Assuming 'thumbnail' is the filename stored in the database */}
              <img className="card-img-top" src={`http://localhost:3001/uploads/${book.thumbnail}`} alt="Card cap" />
              <div className="card-body">
                <h5 className="card-title">{book.bookname}</h5>
                <p className="card-text">{book.author}</p>
                <p>{book.publishedyear}</p>
                <a href="#" className="btn">
                  Read
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
