import React, { Component } from "react";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import _ from "lodash";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    searchQuery: "",
    pageSize: 4,
    currPage: 1,
    selectedGenre: null,
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Movies", _id: "" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currPage: 1 });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted!");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    const currPage = page;
    this.setState({ currPage });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ selectedGenre: null, searchQuery: query, currPage: 1 });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      sortColumn,
      selectedGenre,
      searchQuery,
      pageSize,
      currPage,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, pageSize, currPage);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { sortColumn, pageSize, currPage, searchQuery } = this.state;

    if (this.state.movies.length === 0)
      return <h2>There are no movies in the database</h2>;

    const { totalCount, data: movies } = this.getPagedData();

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
          <div>
            {this.props.user && (
              <Link to="/movies/new" className="btn btn-primary">
                Add new Movie
              </Link>
            )}
            <h2 className="m-2">
              There are {totalCount} movies in the database.{" "}
            </h2>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={sortColumn}
            />
            <Pagination
              totalCount={totalCount}
              pageSize={pageSize}
              currPage={currPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
