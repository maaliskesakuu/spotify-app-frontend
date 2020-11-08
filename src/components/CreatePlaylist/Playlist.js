import React, { Component } from "react";
import "./Playlist.css";

import hash from "../../hash";

import * as constants from "../../constants/constants";

import { Container, Col, Form, Button, Row } from "react-bootstrap";

import {
	EmailShareButton,
	FacebookShareButton,
	TelegramShareButton,
	WhatsappShareButton,
	TwitterShareButton,
	FacebookMessengerShareButton,
} from "react-share";

import {
	WhatsappIcon,
	EmailIcon,
	FacebookIcon,
	TelegramIcon,
	TwitterIcon,
	FacebookMessengerIcon,
} from "react-share";

class Playlist extends Component {
	state = {
		playlistName: "New Playlist",
		playlistDescription: "",
		playlistId: "",
		value: "",
	};

	// to handle the title and description of a new playlist
	handleNameChange(event) {
		this.setState({ playlistName: event.target.value });
	}

	handleDescriptionChange(event) {
		this.setState({ playlistDescription: event.target.value });
	}

	//create an empty, collaborative playlist
	savePlaylist(e) {
		e.preventDefault();

		let accessToken = hash.access_token;
		let userId;
		let playlist = this.state.playlistName;
		let playlistDesc = this.state.playlistDescription;
		//get userId
		fetch(constants.API + "me", {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
			.then(response => response.json())
			.then(jsonResponse => {
				userId = jsonResponse.id;
				//post the data and create the playlist
				fetch(constants.API + `users/${userId}/playlists`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						name: playlist,
						description: playlistDesc,
						collaborative: true,
						public: "false",
					}),
				})
					.then(response => response.json())
					.then(jsonResponse => {
						const playlistId = jsonResponse.id;
						let value = "https://open.spotify.com/playlist/";
						this.setState({ playlistId: playlistId });
						this.setState({ value: value + playlistId });
						alert(`Created a new playlist and saved it to Spotify`);
						this.setState({
							playlistName: "New Playlist",
							playlistDescription: "",
						});
					})
					.catch(error => {
						console.log(error);
					});
			});
	}

	render() {
		return (
			<div>
				<h2
					className="my-5 p-1 text-light text_light"
					style={{ textAlign: "center" }}
				>
					Wanna Make a Playlist with Friends?
				</h2>
				<Container
					style={{
						backgroundColor: "rgba(253, 254, 255, 0.8)",
					}}
					className="py-3 px-0"
				>
					<Row
						className="pt-3"
						style={{ marginRight: "15px", marginLeft: "15px" }}
					>
						<p className="playlist-text mx-sm-5">
							Is there a party coming and you would like to make a
							playlist for the party with your friends and family?
							Make a collaborative playlist and share its Spotify
							web address with them so that they can add their
							favorite tracks to it, too!
							<br />
							<br />
							Making a playlist is easy! Go ahead and fill in the
							form. You can give the playlist a name you like or
							use the one that is there already and add a
							description.
						</p>
					</Row>
				</Container>
				<Container
					className="my-5 mb-3 mt-5 box py-5"
					style={{ paddingRight: 0, paddingLeft: 0 }}
				>
					<Container style={{ paddingRight: 0, paddingLeft: 0 }}>
						<Col md={{ span: 8, offset: 2 }} className="popup">
							<Form className="mx-sm-0 mx-lg-5 my-5 px-lg-5">
								<Form.Group className="mt-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										size="lg"
										type="text"
										name="title"
										onChange={this.handleNameChange.bind(
											this
										)}
										value={this.state.playlistName}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Description</Form.Label>
									<Form.Control
										size="lg"
										as="textarea"
										rows="3"
										name="description"
										placeholder="Enter a description"
										value={this.state.playlistDescription}
										onChange={this.handleDescriptionChange.bind(
											this
										)}
									></Form.Control>
								</Form.Group>
								<Button
									size="lg"
									className="mb-3"
									onClick={this.savePlaylist.bind(this)}
									style={{
										border: "none",
										backgroundColor: "rgb(126, 2, 214)",
									}}
								>
									Save to Spotify
								</Button>
								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label>
										Playlist's web address to share
									</Form.Label>
									<Form.Control
										as="textarea"
										rows="2"
										ref={textarea =>
											(this.textArea = textarea)
										}
										value={this.state.value}
										readOnly
									/>
									<WhatsappShareButton url={this.state.value}>
										<WhatsappIcon
											size={40}
											round={true}
											style={{
												marginTop: "1rem",
												marginRight: "1rem",
											}}
										></WhatsappIcon>
									</WhatsappShareButton>
									<EmailShareButton url={this.state.value}>
										<EmailIcon
											size={40}
											round={true}
											style={{
												marginTop: "1rem",
												marginRight: "1rem",
											}}
										></EmailIcon>
									</EmailShareButton>
									<FacebookShareButton url={this.state.value}>
										<FacebookIcon
											size={40}
											round={true}
											style={{
												marginTop: "1rem",
												marginRight: "1rem",
											}}
										></FacebookIcon>
									</FacebookShareButton>
									<FacebookMessengerShareButton
										url={this.state.value}
									>
										<FacebookMessengerIcon
											size={40}
											round={true}
											style={{
												marginTop: "1rem",
												marginRight: "1rem",
											}}
										></FacebookMessengerIcon>
									</FacebookMessengerShareButton>
									<TelegramShareButton url={this.state.value}>
										<TelegramIcon
											size={40}
											round={true}
											style={{
												marginTop: "1rem",
												marginRight: "1rem",
											}}
										></TelegramIcon>
									</TelegramShareButton>
									<TwitterShareButton url={this.state.value}>
										<TwitterIcon
											size={40}
											round={true}
											style={{
												marginTop: "1rem",
												marginRight: "1rem",
											}}
										></TwitterIcon>
									</TwitterShareButton>
								</Form.Group>
							</Form>
						</Col>
					</Container>
				</Container>
			</div>
		);
	}
}

export default Playlist;
