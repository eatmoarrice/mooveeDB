import React from 'react';
import useWindowDimensions from './WindowDimensions';

export default function Pagination(props) {
	const pageNumbers = [];
	const { height, width } = useWindowDimensions();
	// console.log(height, width);
	// console.log(props.currentPage);
	let maxPage = 10;
	if (width < 1200) maxPage = 4;
	if (width < 800) maxPage = 3;
	let check = true;
	for (let i = 1; i <= props.pages; i++) {
		let currentPage = props.currentPage == i ? 'active' : '';
		if (Math.abs(i - props.currentPage) < maxPage || props.pages - i < maxPage) {
			pageNumbers.push(
				<li className={`page-item ${currentPage}`} key={i} onClick={() => props.nextPage(i)}>
					<a href="#" className="page-link">
						{i}
					</a>
				</li>
			);
		} else if (check && (i > props.currentPage || props.pages - props.currentPage < maxPage)) {
			check = false; //push once
			pageNumbers.push(
				<li className={`disabled page-item`} key={i}>
					<a href="#" className="page-link">
						...
					</a>
				</li>
			);
		}
	}
	return (
		<div className="container">
			<div className="d-flex justify-content-center">
				<ul className="pagination">
					{props.currentPage > 1 ? (
						<li onClick={() => props.nextPage(props.currentPage - 1)}>
							<a href="#" className="page-link">
								Previous
							</a>
						</li>
					) : (
						''
					)}
					{pageNumbers}
					{props.currentPage < props.pages + 1 ? (
						<li onClick={() => props.nextPage(props.currentPage + 1)}>
							<a href="#" className="page-link">
								Next
							</a>
						</li>
					) : (
						''
					)}
				</ul>
			</div>
		</div>
	);
}
