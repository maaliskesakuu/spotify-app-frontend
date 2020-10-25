import React, { Component } from "react";
import hash from "../../hash";

import Home from "./Home";

import { Form, Button } from "react-bootstrap";

import {
	Col,
	Card,
	CardDeck,
	Container,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";

import * as constants from "../../constants/constants";

class NewRelease extends Component {
	state = {
		token: null,
		newRelease: [],
		tooltipText: "",
		selectedOption: "US",
	};

	componentDidMount() {
		let _token = hash.access_token;

		if (_token) {
			this.setState({
				token: _token,
			});
			this.getNewRelease(_token);
		}
	}

	// get the initial, universal new releases
	getNewRelease = token => {
		fetch(constants.API + "browse/new-releases?limit=12", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then(res => res.json())
			.then(data => data.albums.items)
			.then(data =>
				this.setState({
					newRelease: data,
				})
			)
			.catch(err => console.log(err));
	};

	setText(text) {
		this.setState({ tooltipText: text });
	}

	getText() {
		return this.state.tooltipText;
	}

	//show tooltip
	renderTooltip(props) {
		return <Tooltip {...props}>Release date {this.getText()}</Tooltip>;
	}

	handleRadioButtonChange = changeEvent => {
		this.setState({ selectedOption: changeEvent.target.value });
	};

	handleRadioButtonFormSubmit = event => {
		event.preventDefault();

		// get the new releases in the selected country
		let token = hash.access_token;

		fetch(
			constants.API +
				`browse/new-releases?country=${this.state.selectedOption}&limit=12`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then(res => res.json())
			.then(data => data.albums.items)
			.then(data =>
				this.setState({
					newRelease: data,
				})
			)
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div>
				<Container style={{ fontSize: "1.2rem" }}>
					<h2
						className="my-5 text_light text-light"
						style={{ textAlign: "center" }}
					>
						New Releases
					</h2>
					<Form onSubmit={this.handleRadioButtonFormSubmit}>
						<div className="text-light">
							<Form.Check
								inline
								type="radio"
								name="countries"
								label="US"
								value="US"
								checked={this.state.selectedOption === "US"}
								onChange={this.handleRadioButtonChange}
							/>

							<Form.Check
								inline
								type="radio"
								name="countries"
								label="FI"
								value="FI"
								checked={this.state.selectedOption === "FI"}
								onChange={this.handleRadioButtonChange}
							/>

							<Form.Check
								inline
								type="radio"
								name="countries"
								label="SE"
								value="SE"
								checked={this.state.selectedOption === "SE"}
								onChange={this.handleRadioButtonChange}
							/>

							<Form.Check
								inline
								type="radio"
								name="countries"
								label="GB"
								value="GB"
								checked={this.state.selectedOption === "GB"}
								onChange={this.handleRadioButtonChange}
							/>

							<Form.Check
								inline
								type="radio"
								name="countries"
								label="DE"
								value="DE"
								checked={this.state.selectedOption === "DE"}
								onChange={this.handleRadioButtonChange}
							/>

							<Form.Check
								inline
								type="radio"
								name="countries"
								label="RU"
								value="RU"
								checked={this.state.selectedOption === "RU"}
								onChange={this.handleRadioButtonChange}
							/>

							<Form.Check
								inline
								type="radio"
								name="countries"
								label="JP"
								value="JP"
								checked={this.state.selectedOption === "JP"}
								onChange={this.handleRadioButtonChange}
							/>

							<Form.Check
								inline
								type="radio"
								name="countries"
								label="BR"
								value="BR"
								checked={this.state.selectedOption === "BR"}
								onChange={this.handleRadioButtonChange}
							/>

							<Form.Check
								inline
								type="radio"
								name="countries"
								label="ZA"
								value="ZA"
								checked={this.state.selectedOption === "ZA"}
								onChange={this.handleRadioButtonChange}
							/>

							<Form.Check
								inline
								type="radio"
								name="countries"
								label="EG"
								value="EG"
								checked={this.state.selectedOption === "EG"}
								onChange={this.handleRadioButtonChange}
							/>

							<div className="form-group">
								<Button
									className="btn btn-primary mt-2 bg-white"
									size="lg"
									type="submit"
									style={{
										color: "rgb(42, 0, 70)",
										border: "none",
									}}
								>
									Change the country
								</Button>
							</div>
						</div>
					</Form>
				</Container>
				<Container className="mb-5">
					<CardDeck className="box py-3">
						{this.state.newRelease.map((songs, index) => {
							return (
								<Col md={3} key={index}>
									<Card
										style={{
											margin: "10px",
											boxShadow: "0 0 10px #333",
										}}
										key={index}
										onMouseOver={() => {
											this.setText(
												songs.release_date +
													" | " +
													songs.album_type +
													" | tracks: " +
													songs.total_tracks
											);
										}}
									>
										<OverlayTrigger
											placement="bottom"
											overlay={this.renderTooltip.bind(
												this
											)}
										>
											<Card.Img
												src={songs.images[0].url}
												alt="_images"
												className="shapes"
											/>
										</OverlayTrigger>
										<Card.Body
											style={{
												height: "6.5rem",
												padding: "10px",
												overflow: "scroll",
											}}
										>
											<Card.Text>
												{songs.name} |{" "}
												{songs.artists[0].name}
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							);
						})}
					</CardDeck>
				</Container>
				<Home />
			</div>
		);
	}
}

export default NewRelease;
