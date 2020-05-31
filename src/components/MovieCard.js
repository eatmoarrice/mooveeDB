import React from "react";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MovieCard(props) {
	let movie = props.movie;
	return (
		<React.Fragment>
			<Card style={{ width: "20rem" }} className="d-flex flex-column">
				<Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} />
				<Card.Body>
					<Card.Title>{movie.title}</Card.Title>
					{/* <Card.Text>{movie.overview}</Card.Text> */}
				</Card.Body>
				<ListGroup className="list-group-flush mb-auto">
					<ListGroupItem className="genres">
						Genres:{" "}
						{props.genres.map((item) => {
							return <span className="badge badge-warning genre">{item}</span>;
						})}
					</ListGroupItem>
					<ListGroupItem>Release Date: {movie.release_date}</ListGroupItem>
					<ListGroupItem>Rating: {movie.vote_average}</ListGroupItem>
				</ListGroup>
				<div className="mt-auto">
					<Card.Body>
						<Link to={`/movie/${movie.id}`}>
							<p>More details</p>
						</Link>
					</Card.Body>
				</div>
			</Card>
		</React.Fragment>
	);
}
