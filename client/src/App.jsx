import { useState, useEffect } from "react";
import "./style.css";
import Axios from "axios";

const App = () => {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };
  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update/", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };
  return (
    <div className="App">
      <h1>React CRUD</h1>
      <div className="form">
        <label>Movie name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />
        <button onClick={submitReview}>Submit</button>
        <table className="table">
          <tr>
            <th>Movie Name</th>
            <th>Movie Review</th>
            <th>Movie Update & Delete</th>
          </tr>
          {movieReviewList.map((val) => {
            return (
              <tr className="card">
                <td>{val.movieName}</td>
                <td>{val.movieReview}</td>
                <td>
                  <button
                    onClick={() => {
                      updateReview(val.movieName);
                    }}
                  >
                    Update
                  </button>
                  <input
                    type="text"
                    onChange={(e) => {
                      setNewReview(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      deleteReview(val.movieName);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default App;
