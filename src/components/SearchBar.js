import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function SearchBar(props) {
	return (
		<React.Fragment>
			<Form inline className="justify-content-center">
				<FormControl className="justify-content-center" type="text" placeholder="Search" className="mr-sm-2" onChange={props.changeSearch} />
				<Button variant="btn btn-danger" onClick={props.searchFilm}>
					Search
				</Button>
			</Form>
		</React.Fragment>
	);
}
