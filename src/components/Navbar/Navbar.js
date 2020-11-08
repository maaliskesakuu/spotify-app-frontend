import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./Navbar.css";
import "../FontawesomeIcons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Nav, NavItem, Navbar, Dropdown, NavLink } from "react-bootstrap";

const NavBar = () => {
	return (
		<Navbar
			collapseOnSelect
			variant="dark"
			expand="lg"
			style={{
				backgroundColor: "#0c0028",
			}}
		>
			<LinkContainer to="/#">
				<Navbar.Brand>
					<img
						id="logo"
						src="/harmonySmall.png"
						alt="app's logo"
					></img>
				</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse
				id="responsive-navbar-nav"
				className="justify-content-end"
			>
				<Nav
					style={{
						cursor: "pointer",
						padding: "1.5rem 0",
						fontWeight: "bolder",
					}}
				>
					<LinkContainer to="/">
						<Nav.Link className="mr-3 my-1 text-light">
							<FontAwesomeIcon icon="home"></FontAwesomeIcon> Home
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/playlist">
						<Nav.Link className="mr-3 my-1 text-light">
							<FontAwesomeIcon icon="plus-circle"></FontAwesomeIcon>{" "}
							Create Playlist
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/playlists">
						<Nav.Link className="mr-3 my-1 text-light">
							<FontAwesomeIcon icon="list"></FontAwesomeIcon>{" "}
							Playlists
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/featured">
						<Nav.Link className="mr-3 my-1 text-light">
							<FontAwesomeIcon icon="music"></FontAwesomeIcon> New
							and Recent
						</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/history">
						<Nav.Link className="mr-3 my-1 text-light">
							<FontAwesomeIcon icon="history"></FontAwesomeIcon>{" "}
							History Playlist
						</Nav.Link>
					</LinkContainer>

					<Dropdown as={NavItem}>
						<Dropdown.Toggle
							as={NavLink}
							style={{
								paddingRight: "50px",
							}}
							className="my-1 text-light"
						>
							<FontAwesomeIcon icon="user"></FontAwesomeIcon> My
							Account
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<LinkContainer to="/user">
								<Dropdown.Item> Profile</Dropdown.Item>
							</LinkContainer>
							<Dropdown.Item href="//accounts.spotify.com/">
								Log Out
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
