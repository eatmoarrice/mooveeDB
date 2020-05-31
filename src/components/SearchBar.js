import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function SearchBar(props) {
	return (
		<div className="container">
			<Form inline className="justify-content-center" onSubmit={props.searchFilm}>
				<FormControl className="justify-content-center" type="text" placeholder="Search" className="mr-sm-2" onChange={props.changeSearch} />
				<Button variant="outline-success" onClick={props.searchFilm}>
					Search
				</Button>
			</Form>
		</div>
	);
}
