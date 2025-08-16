import { useEffect, useState } from "react";

const KEY = "198290e1";

export function useMovies(query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

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
			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return { movies, isLoading, error };
}
