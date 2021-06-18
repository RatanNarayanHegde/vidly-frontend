import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = { movies: [], genres: [], pageSize: 4, currPage: 1 };

  componentDidMount() {
    const genres = [{ name: "All Movies", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currPage: 1 });
  };

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

  handleSort = (path) => {
    console.log(path);
  };

  render() {
    const { movies: allMovies, selectedGenre, pageSize, currPage } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filtered, pageSize, currPage);

    return (
      <div className="row">
        <div className="col-3 mt-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          {filtered.length === 0 ? (
            <h2 className="m-2">There are no movies in the database</h2>
          ) : (
            <div>
              <h2 className="m-2">
                There are {filtered.length} movies in the database.{" "}
              </h2>
              <MoviesTable
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                totalCount={filtered.length}
                pageSize={pageSize}
                currPage={currPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Movies;
