import React from "react";
import MovieCard from "./MovieCard";

export default function MovieList(props) {
	const getIndividualGenres = (item) => {
		let tempIDs = [];
		item.genre_ids.forEach((element) => {
			tempIDs.push(props.genreList[element]);
		});
		console.log(tempIDs);
		return tempIDs;
	};
	return (
		<div>
			<div className="d-flex flex-wrap">
				{props.movieList.map((item) => {
					let genres = getIndividualGenres(item);
					return <MovieCard movie={item} genres={genres} />;
				})}
			</div>
		</div>
	);
}
