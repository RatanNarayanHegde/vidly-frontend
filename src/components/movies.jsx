import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";

class Movies extends Component {
  state = { movies: getMovies(), pageSize: 4, currPage: 1 };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    const currPage = page;
    this.setState({ currPage });
  };

  render() {
    const { movies: allMovies, pageSize, currPage } = this.state;
    const movies = paginate(allMovies, pageSize, currPage);
    return (
      <>
        {allMovies.length === 0 ? (
          <h2 className="m-2">There are no movies in the database</h2>
        ) : (
          <div>
            <h2 className="m-2">
              There are {allMovies.length} movies in the database.{" "}
            </h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => {
                  return (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          onClick={() => this.handleLike(movie)}
                          liked={movie.liked}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => this.handleDelete(movie)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              totalCount={allMovies.length}
              pageSize={pageSize}
              currPage={currPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        )}
      </>
    );
  }
}

export default Movies;
