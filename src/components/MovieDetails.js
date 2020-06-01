import React, { useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
// import '../MovieDetails.css';
let apiKey = process.env.REACT_APP_APIKEY;
const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

export default function MovieDetails({ match }) {
	useEffect(() => {
		getJustOneMovie();
	}, []);

	const [movie, setMovie] = useState({});
	const [video, setVideo] = useState({});

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
		getVideo();
	};

	const getVideo = async () => {
		try {
			let url = `https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${apiKey}&language=en-US`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error('data is wrong');
			}
			let result = await data.json();
			setVideo(result);
			console.log(result.results);
		} catch (err) {
			alert(err.message);
		}
	};

	if (video.results === undefined) {
		return (
			<div class="preload d-flex justify-content-center align-items-center">
				<div className="sweet-loading">
					<ClipLoader css={override} size={150} color={'#123abc'} loading="true" />
				</div>
			</div>
		);
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
							<div className="left-side col-lg-5 col-12">
								<div>
									<div className="shine shine-single d-inline-block">
										{movie.poster_path == null ? (
											<img className="movie-pic d-block" width="342px" src={`https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png`} alt={movie.title} />
										) : (
											<img className="movie-pic d-block" src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt={movie.title} />
										)}
									</div>
								</div>
							</div>
							<div className="right-side col-lg-7">
								<div className="tagline">{movie.tagline}</div>

								<div className="movie-description">{movie.overview}</div>
								{video.results.length < 1 ? '' : <iframe width="420" height="315" src={`https://www.youtube.com/embed/${video.results[0].key}`}></iframe>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		// </React.Fragment>
	);
}
