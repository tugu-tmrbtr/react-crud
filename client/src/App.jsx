import { useState, useEffect } from "react";
import "./style.css";
import Axios from "axios";

const App = () => {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

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
    }).then(() => {
      alert("Successful insert");
    });
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
        {movieReviewList.map((val) => {
          return (
            <h1>
              Movie Name : {val.movieName} | Movie Review : {val.movieReview}
            </h1>
          );
        })}
      </div>
    </div>
  );
};

export default App;
