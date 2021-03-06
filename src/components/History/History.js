import React, { Component } from "react";
import "./History.css";
import hash from "../../hash";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../FontawesomeIcons/icons";

import * as constants from "../../constants/constants";

import { Table } from "react-bootstrap";

class History extends Component {
	state = {
		searchResults: [],
		token: null,
		musicHistory: [],
		audio: new Audio(""),
	};

	componentDidMount() {
		let _token = hash.access_token;

		if (_token) {
			this.setState({
				token: _token,
			});
			this.getRecentlyPlayed(_token);
		}
	}

	// fetching data of recently played songs
	getRecentlyPlayed = token => {
		fetch(constants.API + "me/player/recently-played", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => res.json())
			.then(data => data.items)
			.then(data =>
				this.setState({
					musicHistory: data,
				})
			)
			.catch(error => {
				console.log(error);
			});
	};

	//play music onClick
	playMusic = preview => {
		// if there's no preview url
		if (!preview) {
			this.state.audio.pause();
			return;
		}
		//if paused, then play
		if (this.state.audio.paused === true) {
			this.setState({ audio: new Audio(preview) }, () => {
				this.state.audio.play();
			});
		}
		//if playing and other track clicked, play clicked track
		else if (
			this.state.audio.paused === false &&
			this.state.audio.src !== preview
		) {
			this.state.audio.pause();
			this.setState({ audio: new Audio(preview) }, () => {
				this.state.audio.play();
			});
		} else {
			//if same track is clicked again, then pause
			this.state.audio.pause();
		}
	};

	render() {
		const { musicHistory } = this.state;

		//table displays information
		const TableItem = (item, index) => (
			<tr key={item.played_at}>
				<td style={{ padding: "0.75rem 0.3rem 0.75rem 0.6rem" }}>
					{index + 1}
				</td>
				<td style={{ padding: "0.75rem 0.3rem" }}>
					<img
						src={item.track.album.images[2].url}
						alt="album cover"
					></img>
				</td>
				<td
					style={{ padding: "0.75rem 0.3rem" }}
					onClick={() => this.playMusic(item.track.preview_url)}
					className="play"
				>
					<FontAwesomeIcon
						icon={item.track.preview_url ? "play-circle" : "ban"}
					/>{" "}
					{item.track.name}
				</td>
				<td style={{ padding: "0.75rem 0.3rem" }}>
					{item.track.artists[0].name}
				</td>
				<td style={{ padding: "0.75rem 0.3rem" }}>
					{format(new Date(item.played_at), "yyyy-MM-dd | HH:mm:ss")}
				</td>
			</tr>
		);

		const RecentlyPlayed = () => (
			<div className="recently-played">
				<Table responsive striped hover style={{ marginBottom: "0px" }}>
					<thead>
						<tr>
							<th
								style={{
									padding: "0.75rem 0.3rem 0.75rem 0.6rem",
								}}
							>
								#
							</th>
							<th style={{ padding: "0.75rem 0.3rem" }}>Cover</th>
							<th style={{ padding: "0.75rem 0.3rem" }}>Track</th>
							<th style={{ padding: "0.75rem 0.3rem" }}>
								Artist
							</th>
							<th style={{ padding: "0.75rem 0.3rem" }}>Time</th>
						</tr>
					</thead>
					<tbody>
						{musicHistory.map((e, index) => TableItem(e, index))}
					</tbody>
				</Table>
			</div>
		);

		return (
			<div className="mb-5 container px-0">
				<h2 className="my-5 head text-light text_light">
					My Listening History
				</h2>
				<div className="box py-5">
					<div className="mx-sm-5">
						{musicHistory.length !== 0 ? <RecentlyPlayed /> : null}
					</div>
				</div>
			</div>
		);
	}
}

export default History;
