import React, { Component } from "react";
import "./Activities.css";

import PlaylistAdd from "../PlaylistAdd/PlaylistAdd";
import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/Searchbar";

import { Container, Row, Button } from "react-bootstrap";

import hash from "../../hash";

import * as constants from "../../constants/constants";

import "../FontawesomeIcons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Activities that user can select from. Activity buttons are created from these activities.
const activities = [
	{
		id: 1,
		activity: "Focus",
		category_id: "focus",
	},
	{
		id: 2,
		activity: "Work Out",
		category_id: "workout",
	},
	{
		id: 3,
		activity: "Sleep",
		category_id: "sleep",
	},
	{
		id: 4,
		activity: "Well-being",
		category_id: "wellness",
	},
	{
		id: 5,
		activity: "Something Else",
		category_id: "somethingelse",
	},
];

class Activities extends Component {
	state = {
		activities: activities,
		selectedCategory: "",
		searchResults: [],
		playlistName: "New Playlist",
		playlistTracks: [],
		muted: false,
	};

	// search with a term given by the user
	search(term) {
		let accessToken = hash.access_token;

		fetch(
			constants.API +
				`search?type=track,artist&q=${term}&limit=20&market=from_token`,
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
			.then(response => {
				return response.json();
			})
			.then(jsonResponse => {
				if (!jsonResponse.tracks) {
					return [];
				}
				return jsonResponse.tracks.items.map(track => ({
					id: track.id,
					name: track.name,
					artist: track.artists[0].name,
					uri: track.uri,
					preview: track.preview_url,
					img: track.album.images[0].url,
				}));
			})
			.then(searchResults => {
				this.setState({ searchResults: searchResults });
				document.getElementById("searchBarInput").value = "";
			})
			.catch(error => {
				console.log(error);
			});
	}

	//Making API call with selected activity/category when activity button is clicked
	getMusic() {
		let token = hash.access_token;

		if (this.state.selectedCategory === "somethingelse") {
			return;
		}

		fetch(
			constants.API +
				`browse/categories/${this.state.selectedCategory}/playlists?limit=5`, //API call to get playlists with category
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then(response => {
				return response.json();
			})
			.then(jsonResponse => {
				if (!jsonResponse.playlists) {
					return [];
				}
				//making array of objects with playlist ids and total amount of tracks in the playlist
				let playlistArray = [];
				jsonResponse.playlists.items.forEach(item => {
					playlistArray.push({
						id: item.id,
						total: item.tracks.total,
					});
				});

				return playlistArray;
			})
			//Making API call with playlist id, limitnumber (how many tracks to get from each playlist, which is now 4)
			//and offset number (random offset number is created to get different results each time)
			.then(playlistArray => {
				for (let i = 0; i < playlistArray.length; i++) {
					let limitNumber = 4;
					let max = playlistArray[i].total - limitNumber;
					let offsetNumber = Math.floor(Math.random() * (max + 1)); //get random offset number min = 0 and max = total amount of tracks - limitNumber
					fetch(
						constants.API +
							`playlists/${playlistArray[i].id}/tracks?market=from_token&offset=${offsetNumber}&limit=${limitNumber}`, //API call with playlists IDs to get tracks
						{
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
						}
					)
						.then(response => {
							return response.json();
						})
						.then(jsonResponse => {
							try {
								if (!jsonResponse.items) {
									return [];
								}
								return jsonResponse.items.map(item => ({
									id: item.track.id,
									name: item.track.name,
									artist: item.track.artists[0].name,
									uri: item.track.uri,
									preview: item.track.preview_url,
									img: item.track.album.images[0].url,
								}));
							} catch (err) {
								return [];
							}
						})
						.then(searchResults => {
							for (let searchResult of searchResults) {
								let tracks = this.state.playlistTracks;
								let results = this.state.searchResults;

								try {
									if (
										tracks.find(
											track =>
												track.id === searchResult.id
										)
									) {
										return;
									}

									if (
										results.find(
											result =>
												result.id === searchResult.id
										)
									) {
										return;
									}

									this.setState({
										searchResults: this.state.searchResults.concat(
											searchResult
										),
									});
								} catch (err) {
									console.log(err);
								}
							}
						})
						.catch(error => {
							console.log(error);
						});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	activityButtonClicked(button) {
		this.setState({ searchResults: [] }); //making tracks empty before making new api call
		this.setState({ selectedCategory: button.target.value }, () => {
			this.getMusic();
		});
	}

	addTrack(track) {
		let tracks = this.state.playlistTracks;
		if (tracks.find(savedTrack => savedTrack.id === track.id)) {
			return;
		}
		this.setState({ playlistTracks: tracks.concat(track) });
	}

	removeTrack(track) {
		let tracks = this.state.playlistTracks;
		let searchResultsTracks = this.state.searchResults;
		tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
		this.setState({ searchResults: searchResultsTracks.concat(track) });
		this.setState({ playlistTracks: tracks });
	}

	removeTrackFromSearchResults(track) {
		let tracks = this.state.searchResults;
		tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
		this.setState({ searchResults: tracks });
	}

	addAndRemoveTrack(track) {
		this.addTrack(track);
		this.removeTrackFromSearchResults(track);
	}

	updatePlaylistName(name) {
		this.setState({ playlistName: name });
	}

	savePlaylistAdd(name) {
		const trackUris = this.state.playlistTracks.map(track => track.uri);

		if (!name || !trackUris.length) {
			return;
		}

		let accessToken = hash.access_token;
		const headers = { Authorization: `Bearer ${accessToken}` };
		let userId;
		let playlist = this.state.playlistName;

		fetch(constants.API + "me", { headers: headers })
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
						public: "true",
					}),
				})
					.then(response => response.json())
					.then(jsonResponse => {
						const playlistId = jsonResponse.id;

						fetch(
							constants.API +
								`users/${userId}/playlists/${playlistId}/tracks`,
							{
								method: "POST",
								headers: {
									Accept: "application/json",
									"Content-Type": "application/json",
									Authorization: `Bearer ${accessToken}`,
								},
								body: JSON.stringify({
									uris: trackUris,
								}),
							}
						)
							.then(() => {
								alert(
									"playlist with selected tracks added to Spotify"
								);
								this.setState({
									playlistName: "New Playlist",
									playlistTracks: [],
									searchResults: [],
								});
							})
							.catch(error => {
								console.log(error);
							});
					});
			})
			.catch(error => {
				console.log(error);
			});
	}

	//Mute or unmute when button is clicked
	mute() {
		this.setState({ muted: !this.state.muted });
	}

	render() {
		const activityList = this.state.activities.map(activity => {
			return (
				<Button
					key={activity.category_id}
					className="activity_button"
					style={{
						padding: "1rem",
						backgroundColor: "rgb(42, 0, 70)",
						border: "none",
						fontSize: "large",
					}}
					onClick={this.activityButtonClicked.bind(this)}
					value={activity.category_id}
				>
					{activity.activity}
				</Button>
			);
		});

		return (
			<>
				<h2
					style={{ color: "white", textAlign: "center" }}
					className="my-5 text_light"
				>
					What Are You in the Mood for?
				</h2>
				<Container
					style={{
						backgroundColor: "rgba(253, 254, 255, 0.8)",
					}}
					className="my-5"
				>
					<Container className="mt-5">
						<Row style={{ justifyContent: "center" }}>
							{activityList}
						</Row>
					</Container>
					{this.state.selectedCategory === "somethingelse" ? (
						<SearchBar
							onSearch={this.search.bind(this)}
						></SearchBar>
					) : (
						""
					)}
				</Container>
				{/* Mute button */}
				<Button id="mute_button" onClick={this.mute.bind(this)}>
					<FontAwesomeIcon
						icon={this.state.muted ? "volume-mute" : "volume-up"}
					></FontAwesomeIcon>
				</Button>
				{this.state.selectedCategory !== "" ? (
					<SearchResults
						searchResults={this.state.searchResults}
						onAdd={this.addAndRemoveTrack.bind(this)}
						muted={this.state.muted}
					/>
				) : (
					""
				)}
				{this.state.selectedCategory !== "" ? (
					<PlaylistAdd
						playlistTracks={this.state.playlistTracks}
						onNameChange={this.updatePlaylistName.bind(this)}
						onRemove={this.removeTrack.bind(this)}
						onSave={this.savePlaylistAdd.bind(this)}
						title={this.state.playlistName}
						muted={this.state.muted}
					></PlaylistAdd>
				) : (
					""
				)}
			</>
		);
	}
}
export default Activities;
