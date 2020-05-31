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
	let check2 = true;
	let z = 0;
	for (let i = 1; i <= props.pages; i++) {
		let currentPage = props.currentPage == i ? 'active' : '';
		if (check2 && (Math.abs(i - props.currentPage) < maxPage / 2 || props.pages - i < maxPage)) {
			z++;
			if (z == maxPage) {
				z = 0;
				check2 = false;
			}
			pageNumbers.push(
				<li className={`page-item ${currentPage}`} key={i} onClick={() => props.nextPage(i)}>
					<a href="#" className="page-link">
						{i}
					</a>
				</li>
			);
		} else if (check && i > props.currentPage) {
			check2 = true;
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
								Prev
							</a>
						</li>
					) : (
						<li class="page-item disabled">
							<a href="#" className="page-link">
								Prev
							</a>
						</li>
					)}
					{pageNumbers}
					{props.currentPage < props.pages ? (
						<li onClick={() => props.nextPage(props.currentPage + 1)}>
							<a href="#" className="page-link">
								Next
							</a>
						</li>
					) : (
						<li class="page-item disabled">
							<a href="#" className="page-link">
								Next
							</a>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}
