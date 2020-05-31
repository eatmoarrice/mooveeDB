import React from 'react';
// import { Card, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MovieCard(props) {
	let movie = props.movie;
	return (
		<React.Fragment>
			<Link to={`/movie/${movie.id}`}>
				<div className="flex-basis-card d-flex justify-content-around align-items-center">
					<div className="movie-card d-flex flex-column d-flex ">
						<div className="shine">
							<span className="badge badge-danger top-right-badge"> {movie.vote_average}</span>
							<div className="cards-img-div">
								{movie.poster_path == null ? (
									<p>
										{movie.title}
										<img className="cards-img" width="300px" src={'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png'} />
									</p>
								) : (
									<img className="cards-img" src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
								)}
							</div>

							<div className="cards-body">
								{/* <div>{movie.title}</div> */}
								{/* <Card.Text>{movie.overview}</Card.Text> */}

								<div className="genres">
									{props.genres.map((item) => {
										return <span className="badge badge-warning genre">{item}</span>;
									})}
								</div>

								{/* <div>
							<Link to={`/movie/${movie.id}`}>
								<p>More details</p>
							</Link>
						</div> */}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</React.Fragment>
	);
}
