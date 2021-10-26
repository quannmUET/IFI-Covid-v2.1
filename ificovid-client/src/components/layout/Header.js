import React from "react";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.username,
		};
	}
	render() {
		return (
			<nav className="navbar navbar-expand-sm navbar-light bg-light">
				<div className="container">
					<a className="navbar-brand" href="/">
						IFI-COVID
					</a>
					<button
						className="navbar-toggler d-lg-none"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapsibleNavId"
						aria-controls="collapsibleNavId"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="collapsibleNavId">
						<ul className="navbar-nav me-auto mt-2 mt-lg-0">
							<li className="nav-item active">
								<a className="nav-link" href="/manage-patients">
									Manage Patients <span className="visually-hidden">(current)</span>
								</a>
							</li>
							{/* <li className="nav-item">
                                <a className="nav-link" href="/manage-accounts">Manage Accounts</a>
                            </li> */}
						</ul>

						<a href="/logout" className="my-2">
							Hello, {this.state.username}
						</a>
					</div>
				</div>
			</nav>
		);
	}
}
export default Header;
