import React from "react";
import { Form, Col, Row } from "react-bootstrap";

class AddressSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			patient: this.props.patient,
			cities: [],
			districts: [],
			wards: [],
		};
	}

	fetchCities() {
		fetch("https://provinces.open-api.vn/api/p/")
			.then((response) => response.json())
			.then((data) => this.setState({ cities: data }));
	}
	fetchDistricts(city) {
		fetch("https://provinces.open-api.vn/api/p/" + city + "?depth=2")
			.then((response) => response.json())
			.then((data) => this.setState({ districts: data.districts }));
	}
	fetchWards(district) {
		fetch("https://provinces.open-api.vn/api/d/" + district + "?depth=2")
			.then((response) => response.json())
			.then((data) => this.setState({ wards: data.wards }));
	}

	getCityCode(cityName) {
		return this.state.cities.find((city) => city.name === cityName).code;
	}
	getDistrictCode(districtName) {
		return this.state.districts.find((district) => district.name === districtName).code;
	}
	getWardCode(wardName) {
		return this.state.wards.find((ward) => ward.name === wardName).code;
	}

	componentDidMount() {
		this.fetchCities();
	}

	render() {
		return (
			<>
				<Form.Group as={Row} controlId="street" className="mb-1">
					<Form.Label size="sm" column xs={4}>
						Street:
					</Form.Label>
					<Col xs={8}>
						<Form.Control
							type="text"
							size="sm"
							defaultValue={!this.props.patient ? "" : this.props.patient.address.street}
							onBlur={(e) => {
								this.props.onStreetChange(e.target.value);
							}}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row} className="mb-1">
					<Form.Label size="sm" column xs={4}>
						Address:
					</Form.Label>
					<Col xs={8}>
						<Row>
							<Col xs={4}>
								<Form.Control
									as="select"
									size="sm"
									name="city"
									key="city"
									onChange={(e) => {
										this.setState({ districts: [], wards: [] });
										this.props.onCityChange(e.target.value);
										this.fetchDistricts(this.getCityCode(e.target.value));
									}}
								>
									<option value={!this.state.patient ? "" : this.state.patient.address.city} defaultValue={!this.state.patient ? "" : this.state.patient.address.city}>
										{!this.state.patient ? "Select City" : this.state.patient.address.city}
									</option>
									{this.state.cities.map((city) => (
										<option key={city.code} value={city.name}>
											{city.name}
										</option>
									))}
								</Form.Control>
							</Col>
							<Col xs={4}>
								<Form.Control
									as="select"
									size="sm"
									name="district"
									key="ward"
									onChange={(e) => {
										this.setState({ district: e.target.value, wards: [] });
										this.props.onDistrictChange(e.target.value);
										this.fetchWards(this.getDistrictCode(e.target.value));
									}}
								>
									<option value={!this.state.patient ? "" : this.state.patient.address.district} defaultValue={!this.state.patient ? "" : this.state.patient.address.district}>
										{!this.state.patient ? "Select District" : this.state.patient.address.district}
									</option>
									{this.state.districts.map((district) => (
										<option key={district.code} value={district.name}>
											{district.name}
										</option>
									))}
								</Form.Control>
							</Col>
							<Col xs={4}>
								<Form.Control
									as="select"
									size="sm"
									name="ward"
									key="ward"
									onChange={(e) => {
										this.setState({ ward: e.target.value });
										this.props.onWardChange(e.target.value);
									}}
								>
									<option value={!this.state.patient ? "" : this.state.patient.address.ward} defaultValue={!this.state.patient ? "" : this.state.patient.address.ward}>
										{!this.state.patient ? "Select Ward" : this.state.patient.address.ward}
									</option>
									{this.state.wards.map((ward) => (
										<option key={ward.code} value={ward.name}>
											{ward.name}
										</option>
									))}
								</Form.Control>
							</Col>
						</Row>
					</Col>
				</Form.Group>
			</>
		);
	}
}
export default AddressSelector;
