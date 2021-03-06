import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "../../config";
import hash from "../../hash";
import "./App.css";
import Routers from "../../Routers";
import Footer from "../Footer/Footer";
import Video from "../Video/sky.mp4"; //video from https://www.pexels.com/video/video-of-beautiful-sky-855780/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../FontawesomeIcons/icons";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
	state = { token: null };

	componentDidMount() {
		// Set token
		let _token = hash.access_token;

		if (_token) {
			// Set token
			this.setState({
				token: _token,
			});
		}
	}

	render() {
		return (
			<>
				<main>
					{/* If there no token and the background is the welcome page*/}
					{!this.state.token && (
						<div className="background">
							<div id="container">
								<video autoPlay loop muted>
									<source src={Video} type="Video/mp4" />
								</video>
								<h1 className="mb-0">Welcome!</h1>
								<img
									src="/harmonySmall.png"
									alt="logo"
									style={{
										width: "10rem",
										margin: "1.5rem auto",
									}}
								/>
								<h2 className="mb-1 mt-0 pt-0">
									We made your music life much easier.
								</h2>
								<div className="icon_wrap">
									<FontAwesomeIcon
										icon="search"
										className="ico mb-3"
									/>
									<h3>Search</h3>
									<p>music based on your activity</p>
									<br />
									<FontAwesomeIcon
										icon="mouse-pointer"
										className="ico mb-3"
									/>
									<h3>Hover</h3>
									<p>to get a glimpse of your tracks</p>
									<br />
									<FontAwesomeIcon
										icon="plus"
										className="ico mb-3"
									/>
									<h3>Create</h3>
									<p>your own library</p>
								</div>

								{/* this is the call to the Spotify Account Service */}
								<a
									href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
										"%20"
									)}&response_type=token&show_dialog=true`}
								>
									<button
										id="btn"
										style={{
											border: "none",
											backgroundColor: "rgb(42, 0, 70)",
											borderRadius: "25px",
											marginTop: "1.5rem",
											color: "white",
											fontWeight: "610",
										}}
									>
										Get started!
									</button>
								</a>
							</div>
						</div>
					)}
					{/* If there a token and the background is the app's home page*/}
					{this.state.token && (
						<div className="loggedInBackground">
							<Routers />
						</div>
					)}
				</main>
				<footer>{this.state.token && <Footer />}</footer>
			</>
		);
	}
}

export default App;
