import React from "react";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";

export default function MovieCard(props) {
	let movie = props.movie;
	return (
		<React.Fragment>
			<Card style={{ width: "18rem" }}>
				<Card.Img variant="top" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} />
				<Card.Body>
					<Card.Title>{movie.title}</Card.Title>
					<Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroupItem>
						Genres:{" "}
						{props.genres.map((item) => {
							return <span>{item} </span>;
						})}
					</ListGroupItem>
					<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
					<ListGroupItem>Vestibulum at eros</ListGroupItem>
				</ListGroup>
				<Card.Body>
					<Card.Link href="#">Card Link</Card.Link>
					<Card.Link href="#">Another Link</Card.Link>
				</Card.Body>
			</Card>
		</React.Fragment>
	);
}
