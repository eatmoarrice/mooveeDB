import React, { useEffect, useState } from 'react';
import '../App.css';
let apiKey = process.env.REACT_APP_APIKEY;

export default function MovieDetails({ match }) {
	useEffect(() => {
		getJustOneMovie();
	}, []);

	const [movie, setMovie] = useState({});

	const getJustOneMovie = async () => {
		try {
			let url = `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${apiKey}&language=en-US`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error('data is wrong');
			}
			let result = await data.json();
			setMovie(result);
			console.log(result);
		} catch (err) {
			alert(err.message);
		}
	};
	if (movie.genres === undefined) {
		return <div>loading</div>;
	}
	return (
		// <React.Fragment>
		<div>
			<div className="single-movie-card mx-auto">
				<div className="placeholder">
					<div
						className="card-content"
						style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`, backgroundSize: 'cover' }}
					>
						<div className="movie-title">
							{movie.title} <span className="badge badge-danger score">{movie.vote_average}</span>
						</div>
						<div className="genre-lang">
							{movie.genres.map((item) => {
								return <span className="badge badge-warning genre">{item.name}</span>;
							})}
							{movie.spoken_languages.map((item) => {
								return <span className="badge badge-primary genre">{item.name}</span>;
							})}
							&nbsp;&nbsp;&nbsp;
							{movie.runtime}min
						</div>
						<hr className="style-four"></hr>
						<div className="row">
							<div className="left-side col-md-4 col-12">
								<div>
									<img className="movie-pic" src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={movie.title} />
								</div>
							</div>
							<div className="right-side col-md-8">
								<div className="tagline">{movie.tagline}</div>

								<div className="movie-description">{movie.overview}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		// </React.Fragment>
	);
}
