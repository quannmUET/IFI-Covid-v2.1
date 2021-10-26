import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import AddressSelector from "../../layout/AddressSelector";

class AddPatientModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			validated: false,
			show: false,
			name: "",
			dateOfBirth: "",
			gender: "",
			idCard: "",
			phone: "",
			insurance: "",
			image: "",
			city: "",
			district: "",
			ward: "",
			street: "",
		};
	}

	handleClose = () => {
		this.setState({ show: false });
	};
	handleShow = () => {
		this.setState({ show: true });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.props.onAddPatient);
		debugger;
		let patient = {
			name: this.state.name,
			dateOfBirth: this.state.dateOfBirth,
			gender: this.state.gender,
			identityCard: this.state.idCard,
			healthInsuranceNumber: this.state.insurance,
			phoneNumber: this.state.phone,
			image: this.state.image,
			address: { city: this.state.city, district: this.state.district, ward: this.state.ward, street: this.state.street },
		};
		console.log("patient----" + JSON.stringify(patient));
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(patient),
		};
		fetch("/patient/new", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({ show: false });
				this.props.onAddPatient();
			})
			.catch((error) => {
				console.log("error", error);
				alert("Error: " + error);
			});
	};
	handleCitySelect = (city) => {
		this.setState({ city: city });
		console.log(city);
	};
	handleDistrictSelect = (district) => {
		this.setState({ district: district });
		console.log(district);
	};
	handleWardSelect = (ward) => {
		this.setState({ ward: ward });
		console.log(ward);
	};
	handleStreetSelect = (street) => {
		this.setState({ street: street });
		console.log(street);
	};

	render() {
		return (
			<>
				<Button variant="success" size="sm" className="me-1" title="View this patient's details" onClick={this.handleShow}>
					<i className="fas fa-user-plus fa-sm fa-fw"></i> Add Patient
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose} animation={false} size="lg">
					<Modal.Header closeButton>
						<Modal.Title>Add New Patient</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form validated={this.state.validated} onSubmit={this.handleSubmit}>
							<fieldset>
								<legend>Personal Information</legend>
								{/* Patient Name */}
								<Form.Group as={Row} controlId="patientName" className="mb-1">
									<Form.Label size="sm" column xs={4}>
										Patient Name:
									</Form.Label>
									<Col xs={8}>
										<Form.Control
											type="text"
											size="sm"
											onBlur={(event) => {
												console.log(event.target.value);
												this.setState({ name: event.target.value });
											}}
										/>
									</Col>
								</Form.Group>
								{/* Patient Gender */}
								<Form.Group as={Row} controlId="patientGender" className="mb-1">
									<Form.Label size="sm" column xs={4}>
										Gender:
									</Form.Label>
									<Col xs={8}>
										<Form.Select
											size="sm"
											onChange={(event) => {
												console.log(event.target.value);
												this.setState({ gender: event.target.value });
											}}
										>
											<option value="">Select Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
											<option value="Other">Other</option>
										</Form.Select>
									</Col>
								</Form.Group>
								{/* Patient Birthday */}
								<Form.Group as={Row} controlId="dateOfBirth" className="mb-1">
									<Form.Label size="sm" column xs={4}>
										Date Of Birth:
									</Form.Label>
									<Col xs={8}>
										<Form.Control
											type="date"
											size="sm"
											max={new Date().toJSON().split("T")[0]}
											onChange={(event) => {
												console.log(event.target.value);
												this.setState({ dateOfBirth: event.target.value });
											}}
										/>
									</Col>
								</Form.Group>
								{/* Patient ID Card */}
								<Form.Group as={Row} controlId="identityCard" className="mb-1">
									<Form.Label size="sm" column xs={4}>
										ID Card:
									</Form.Label>
									<Col xs={8}>
										<Form.Control
											type="text"
											size="sm"
											onBlur={(event) => {
												console.log(event.target.value);
												this.setState({ idCard: event.target.value });
											}}
										/>
									</Col>
								</Form.Group>
								{/* Patient Insurance */}
								<Form.Group as={Row} controlId="insurance" className="mb-1">
									<Form.Label size="sm" column xs={4}>
										Insurance Number:
									</Form.Label>
									<Col xs={8}>
										<Form.Control
											type="text"
											size="sm"
											onBlur={(event) => {
												console.log(event.target.value);
												this.setState({ insurance: event.target.value });
											}}
										/>
									</Col>
								</Form.Group>
								{/* Patient Address */}
								<AddressSelector
									onCityChange={this.handleCitySelect}
									onDistrictChange={this.handleDistrictSelect}
									onWardChange={this.handleWardSelect}
									onStreetChange={this.handleStreetSelect}
								/>
								{/* Patient Phone */}
								<Form.Group as={Row} controlId="phone" className="mb-1">
									<Form.Label size="sm" column xs={4}>
										Phone Number:
									</Form.Label>
									<Col xs={8}>
										<Form.Control
											type="text"
											size="sm"
											onBlur={(event) => {
												console.log(event.target.value);
												this.setState({ phone: event.target.value });
											}}
										/>
									</Col>
								</Form.Group>
								{/* Patient image */}
								<Form.Group as={Row} controlId="image" className="mb-1">
									<Form.Label size="sm" column xs={4}>
										Image:
									</Form.Label>
									<Col xs={8}>
										<Form.Control type="file" size="sm" accept="*.jpg, *.png, *.gif" />
									</Col>
								</Form.Group>
							</fieldset>

							<Button variant="success" type="submit">
								Add Patient
							</Button>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
export default AddPatientModal;

//  eslint-disable-next-line
{
	/* <fieldset >
    <legend>Vaccination Information</legend>
    <Row>
        <Col xs={6}>
            <legend>Injection No.1</legend>
            <Form.Group as={Row} controlId="no1VaccineName" className="mb-1">
                <Form.Label size="sm" column xs={6} >Vaccine Name:</Form.Label>
                <Col xs={6}>
                    <Form.Control type="text" size="sm" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="no1VaccineNo" className="mb-1">
                <Form.Label size="sm" column xs={6} >Vaccine No:</Form.Label>
                <Col xs={6}>
                    <Form.Control type="text" size="sm" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="no1InjectionDate" className="mb-1">
                <Form.Label size="sm" column xs={6} >Injection Date:</Form.Label>
                <Col xs={6}>
                    <Form.Control type="text" size="sm" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="no1InjectionPlace" className="mb-1">
                <Form.Label size="sm" column xs={6} >Injection Place:</Form.Label>
                <Col xs={6}>
                    <Form.Control type="text" size="sm" />
                </Col>
            </Form.Group>
        </Col>
        <Col xs={6}>
            <legend>Injection No.2</legend>
            <Form.Group as={Row} controlId="no2VaccineName" className="mb-1">
                <Form.Label size="sm" column xs={6} >Vaccine Name:</Form.Label>
                <Col xs={6}>
                    <Form.Control type="text" size="sm" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="no2VaccineNo" className="mb-1">
                <Form.Label size="sm" column xs={6} >Vaccine No:</Form.Label>
                <Col xs={6}>
                    <Form.Control type="text" size="sm" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="no2InjectionDate" className="mb-1">
                <Form.Label size="sm" column xs={6} >Injection Date:</Form.Label>
                <Col xs={6}>
                    <Form.Control type="text" size="sm" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="no2InjectionPlace" className="mb-1">
                <Form.Label size="sm" column xs={6} >Injection Place:</Form.Label>
                <Col xs={6}>
                    <Form.Control type="text" size="sm" />
                </Col>
            </Form.Group>
        </Col>

    </Row>
</fieldset> */
}
