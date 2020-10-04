import React, { Component } from "react";
import hash from "../../hash";

import { Col, Card, CardDeck, Container } from "react-bootstrap";

import * as constants from "../../constants/constants";

import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

class Home extends Component {
	state = {
		token: null,
		playlists: [],
		currentPage: 1,
		total: null,
	};

	componentDidMount() {
		let _token = hash.access_token;

		if (_token) {
			this.setState({
				token: _token,
			});
			this.getPlaylists(_token);
		}
	}

	// get the first, initial page of playlists
	getPlaylists = token => {
		fetch(constants.API + "me/playlists?limit=12", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => res.json())
			.then(data => {
				if (!data) {
					return [];
				}
				return data;
			})
			.then(data =>
				this.setState({
					playlists: data.items,
					total: data.total,
				})
			)
			.catch(error => {
				console.log(error);
			});
	};

	changeCurrentPage = numPage => {
		this.setState({ currentPage: numPage });

		//fetch playlist data based on pageNumber
		let _offset = numPage * 12 - 12;
		let _token = hash.access_token;

		fetch(constants.API + `me/playlists?limit=12&offset=${_offset}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${_token}`,
			},
		})
			.then(res => res.json())
			.then(data => {
				if (!data) {
					return [];
				}
				return data;
			})
			.then(data =>
				this.setState({
					playlists: data.items,
				})
			)
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return (
			<div>
				<Container className="mb-5">
					<h2
						className="my-5 text_light"
						style={{ color: "white", textAlign: "center" }}
					>
						My Playlists
					</h2>
					<CardDeck
						className="box pt-3 pb-5"
						style={{ position: "relative" }}
					>
						{this.state.playlists.map((playlist, index) => {
							return (
								<Col md={3} key={index}>
									<Card
										style={{
											margin: "10px",
											boxShadow: "0 0 10px #333",
										}}
										key={index}
									>
										<Card.Body
											style={{
												height: "35rem",
												padding: "10px",
												overflow: "scroll",
											}}
										>
											{playlist.images.length > 0 ? (
												<Card.Img
													variant="top"
													src={playlist.images[0].url}
													style={{
														marginBottom: "0.5rem",
													}}
												></Card.Img>
											) : (
												<Card.Img
													variant="top"
													src="/pexels-vova-krasilnikov-2796145-smaller.jpg"
													//Kuvaaja Vova Krasilnikov palvelusta Pexels
													style={{
														marginBottom: "0.5rem",
													}}
												></Card.Img>
											)}
											<div>
												<strong>Name: </strong>
												{playlist.name} {<hr />}{" "}
												<strong>Description: </strong>
												{playlist.description} {<hr />}{" "}
												<strong>Owner: </strong>
												{
													playlist.owner.display_name
												}{" "}
												{<hr />}
												<strong>Tracks: </strong>
												{playlist.tracks.total} {<hr />}
												<strong>Playlist: </strong>
												<a
													href={
														playlist.external_urls
															.spotify
													}
													target="_blank"
													rel="noopener noreferrer"
												>
													Playlist in Spotify
												</a>
											</div>
										</Card.Body>
									</Card>
								</Col>
							);
						})}
						<div
							style={{
								position: "absolute",
								bottom: "5px",
								left: "1.5rem",
							}}
						>
							<Pagination
								currentPage={this.state.currentPage}
								totalSize={this.state.total}
								sizePerPage={12}
								changeCurrentPage={this.changeCurrentPage}
								theme="bootstrap"
							/>
						</div>
					</CardDeck>
				</Container>
			</div>
		);
	}
}
export default Home;
