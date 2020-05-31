import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList(props) {
	const getIndividualGenres = (item) => {
		let tempIDs = [];
		item.genre_ids.forEach((element) => {
			tempIDs.push(props.genreList[element]);
		});
		// console.log(tempIDs);
		return tempIDs;
	};

	const filterListByKeyword = () => {
		let filteredList = props.movieList.filter((movie) => movie.title.toLowerCase().includes(props.filter.toLowerCase()));
		console.log(props.filter);
		return filteredList;
	};
	return (
		<div>
			<div className="d-flex flex-wrap justify-content-around flex-list">
				{filterListByKeyword().map((item) => {
					let genres = getIndividualGenres(item);
					return <MovieCard movie={item} genres={genres} />;
				})}
				<div className="flexfix"></div>
				<div className="flexfix"></div>
				<div className="flexfix"></div>
				<div className="flexfix"></div>
				<div className="flexfix"></div>
			</div>
		</div>
	);
}
