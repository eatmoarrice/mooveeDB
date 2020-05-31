import React, { useEffect, useState } from "react";
let apiKey = process.env.REACT_APP_APIKEY;

export default function MovieDetails({ match }) {
	useEffect(() => {
		getJustOneMovie();
		console.log(match);
	}, []);

	const [movie, setMovie] = useState({});

	const getJustOneMovie = async () => {
		try {
			let url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${apiKey}&language=en-US`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error("data is wrong");
			}
			let result = await data.json();
			setMovie(result);
			console.log(result);
		} catch (err) {
			alert(err.message);
		}
	};

	return <div>werewrew</div>;
}
