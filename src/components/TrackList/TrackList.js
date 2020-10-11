import React, { Component } from "react";

import { Col, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

import "../FontawesomeIcons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TrackList extends Component {
	state = {
		audio: new Audio(""),
	};

	addTrack(track) {
		this.props.onAdd(track);
	}

	removeTrack(track) {
		this.props.onRemove(track);
	}

	renderTooltip(props) {
		return <Tooltip {...props}>Sorry, no preview</Tooltip>;
	}

	playMusic(preview) {
		if (this.props.muted) {
			return;
		}
		this.setState({ audio: new Audio(preview) }, async () => {
			try {
				await this.state.audio.play();
			} catch {}
		});
	}

	pauseMusic() {
		this.state.audio.pause();
		this.setState({ audio: new Audio("") });
	}

	renderAction(track) {
		if (this.props.isRemoval) {
			return (
				<Button
					onClick={() => this.removeTrack(track)}
					style={{
						position: "absolute",
						right: "10px",
						bottom: "10px",
						backgroundColor: "#C40000",
						border: "none",
					}}
				>
					<FontAwesomeIcon icon="minus"></FontAwesomeIcon>
				</Button>
			);
		}

		return (
			<Button
				onClick={() => this.addTrack(track)}
				style={{
					position: "absolute",
					right: "10px",
					bottom: "10px",
					backgroundColor: "rgb(126, 2, 214)",
					border: "none",
				}}
			>
				<FontAwesomeIcon icon="plus"></FontAwesomeIcon>
			</Button>
		);
	}

	render() {
		return (
			<>
				{this.props.tracks.map(track => {
					return (
						<Col md={3} key={track.id}>
							<Card
								style={{
									margin: "10px",
									boxShadow: "0 0 10px #333",
								}}
							>
								{/* Conditional tooltips */}
								{!track.preview ? (
									<OverlayTrigger
										placement="bottom"
										overlay={this.renderTooltip.bind(this)}
									>
										<Card.Img
											variant="top"
											src={track.img}
										/>
									</OverlayTrigger>
								) : (
									<Card.Img
										variant="top"
										src={track.img}
										onMouseOver={() =>
											this.playMusic(track.preview)
										}
										onMouseOut={this.pauseMusic.bind(this)}
									/>
								)}
								<Card.Body
									style={{
										height: "6.5rem",
										padding: "10px",
										overflow: "scroll",
									}}
								>
									<Card.Text>
										{track.name} | {track.artist}
									</Card.Text>
									{this.renderAction(track)}
								</Card.Body>
							</Card>
						</Col>
					);
				})}
			</>
		);
	}
}

export default TrackList;
