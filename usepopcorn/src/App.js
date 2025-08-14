import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";

const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "198290e1";

export default function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	// const [watched, setWatched] = useState([]);
	const [watched, setWatched] = useState(function () {
		return JSON.parse(localStorage.getItem("watched")) || [];
	});

	function handleSelectMovie(movieId) {
		setSelectedId(id => (id === movieId ? null : movieId));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched(watched => [...watched, movie]);
	}

	function handleDeleteWatched(id) {
		setWatched(watched => watched.filter(movie => movie.imdbID !== id));
	}

	useEffect(
		function () {
			localStorage.setItem("watched", JSON.stringify(watched));
		},
		[watched]
	);

	// infinite loop
	// fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=pokemon`)
	// 	.then(resp => resp.json())
	// 	.then(data => setMovies(data.Search));
	useEffect(
		function () {
			const controller = new AbortController();
			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError("");
					const resp = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
						{ signal: controller.signal }
					);
					if (!resp.ok)
						throw new Error("Something went wrong with fetching movies");
					const data = await resp.json();
					if (data.Response === "False") throw new Error("Movie not Found");
					setMovies(data.Search);
					setError("");
				} catch (err) {
					if (err.name !== "AbortError") {
						console.error(err.message);
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}
			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}
			handleCloseMovie();
			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return (
		<>
			<NavBar>
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>
			<Main>
				{/* <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
				<Box>
					{isLoading && <Loader />}
					{!isLoading && !error && (
						<MovieList movies={movies} onSelectMovie={handleSelectMovie} />
					)}
					{error && <ErrorMessage message={error} />}
				</Box>
				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMovieList
								watched={watched}
								onDeleteWatched={handleDeleteWatched}
							/>
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function Loader() {
	return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
	return (
		<p className="error">
			<span>❌💥</span>
			{message}
		</p>
	);
}

function NavBar({ children }) {
	return (
		<nav className="nav-bar">
			<Logo />
			{children}
		</nav>
	);
}

function Logo() {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function Search({ query, setQuery }) {
	// DOM element is usually null
	const inputEl = useRef(null);

	useEffect(
		function () {
			function callBack(e) {
				if (document.activeElement === inputEl.current) return;
				if (e.key !== "Enter") return;
				setQuery("");
				inputEl.current.focus();
			}
			document.addEventListener("keydown", callBack);
			return () => document.removeEventListener("keydown", callBack);
		},
		[setQuery]
	);

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={e => setQuery(e.target.value)}
			// with this we don't need querySelector
			ref={inputEl}
		/>
	);
}

function NumResults({ movies }) {
	return (
		<p className="num-results">
			Found <strong>{movies.length}</strong> results
		</p>
	);
}

function Main({ children }) {
	return <main className="main">{children}</main>;
}

function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="box">
			<button className="btn-toggle" onClick={() => setIsOpen(open => !open)}>
				{isOpen ? "–" : "+"}
			</button>
			{isOpen && children}
		</div>
	);
}
/*
function WatchedBox() {
// 	const [watched, setWatched] = useState(tempWatchedData);
// 	const [isOpen2, setIsOpen2] = useState(true);

// 	return (
// 		<div className="box">
// 			<button className="btn-toggle" onClick={() => setIsOpen2(open => !open)}>
// 				{isOpen2 ? "–" : "+"}
// 			</button>
// 			{isOpen2 && (
// 				<>
// 					<WatchedSummary watched={watched} />
// 					<WatchedMovieList watched={watched} />
// 				</>
// 			)}
// 		</div>
// 	);
}
*/

function MovieList({ movies, onSelectMovie }) {
	return (
		<ul className="list list-movies">
			{movies?.map(movie => (
				<Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
			))}
		</ul>
	);
}

function Movie({ movie, onSelectMovie }) {
	return (
		<li onClick={() => onSelectMovie(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [userRating, setUserRating] = useState("");

	const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		movie => movie.imdbID === selectedId
	)?.userRating;

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
			userRating: userRating,
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}

	useEffect(
		function () {
			function callBack(e) {
				if (e.key !== "Escape") return;
				onCloseMovie();
			}
			document.addEventListener("keydown", callBack);
			return () => document.removeEventListener("keydown", callBack);
		},
		[onCloseMovie]
	);

	useEffect(
		function () {
			async function getMoviesDetails() {
				try {
					setIsLoading(true);
					setError("");
					const resp = await fetch(
						`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
					);
					if (!resp.ok)
						throw new Error("Something went wrong with fetching the movie");
					const data = await resp.json();
					// if (data.Response === "False") throw new Error("Movie not Found");
					setMovie(data);
				} catch (err) {
					console.error(err.message);
					setError(err.message);
				} finally {
					setIsLoading(false);
				}
			}
			getMoviesDetails();
		},
		[selectedId]
	);

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;
			return () => (document.title = "usePopcorn");
		},
		[title]
	);

	return (
		<div className="details">
			{isLoading && <Loader />}
			{!isLoading && !error && (
				<>
					<header>
						<button className="btn-back" onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie} Movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>

					<section>
						<div className="rating">
							{isWatched ? (
								<p>
									You rated the movie {watchedUserRating}
									<span>🌟</span>
								</p>
							) : (
								<>
									<StarRating
										size={24}
										maxRating={10}
										onSetRating={setUserRating}
									/>

									{userRating > 0 && (
										<button className="btn-add" onClick={handleAdd}>
											+ Add to list
										</button>
									)}
								</>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
			{error && <ErrorMessage message={error} />}
		</div>
	);
}

function WatchedSummary({ watched }) {
	const avgImdbRating = average(watched.map(movie => movie.imdbRating));
	const avgUserRating = average(watched.map(movie => movie.userRating));
	const avgRuntime = average(watched.map(movie => movie.runtime));

	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{Math.round(avgImdbRating * 10) / 10}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{Math.round(avgUserRating * 10) / 10}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{Math.round(avgRuntime)} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMovieList({ watched, onDeleteWatched }) {
	return (
		<ul className="list">
			{watched.map(movie => (
				<WatchedMovie movie={movie} onDeleteWatched={onDeleteWatched} />
			))}
		</ul>
	);
}

function WatchedMovie({ movie, onDeleteWatched }) {
	return (
		<li key={movie.imdbID}>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>

				<button
					className="btn-delete"
					onClick={() => onDeleteWatched(movie.imdbID)}
				>
					X
				</button>
			</div>
		</li>
	);
}
