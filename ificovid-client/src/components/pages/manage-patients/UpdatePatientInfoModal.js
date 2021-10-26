import React from "react";
import { Col, Row, Form, Button, Modal } from "react-bootstrap";
import AddressSelector from "../../layout/AddressSelector";
class UpdatePatientInfoModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	handleClose = () => {
		this.setState({ show: false });
	};
	handleShow = () => {
		this.setState({ show: true });
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

	handleSubmit = (e) => {
		e.preventDefault();
		let form = e.target;
		let newPatient = {
			name: form.name.value,
			dateOfBirth: form.dateOfBirth.value,
			gender: form.gender.value,
			identityCard: form.identityCard.value,
			phoneNumber: form.phoneNumber.value,
			healthInsuranceNumber: form.insurance.value,
			address: { city: form.city.value, district: form.district.value, ward: form.ward.value, street: form.street.value },
			vaccinationInfo: [
				{ vaccineName: form.no1VaccineName.value, vaccineNo: form.no1VaccineNo.value, injectionDate: form.no1InjectionDate.value, injectionPlace: form.no1InjectionPlace.value },
				{ vaccineName: form.no2VaccineName.value, vaccineNo: form.no2VaccineNo.value, injectionDate: form.no2InjectionDate.value, injectionPlace: form.no2InjectionPlace.value },
			],
		};
		console.log("newPatient----" + JSON.stringify(newPatient));
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newPatient),
		};
		fetch(`/patient/${this.props.patient.id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.props.onUpdatePatient();
				this.handleClose();
			})
			.catch((error) => {
				console.log("error", error);
				alert("Error: " + error);
			});
	};

	render() {
		return (
			<>
				<Button variant="warning" size="sm" className="me-1" title="Update this patient's info" onClick={this.handleShow}>
					<i className="fas fa-pencil-alt fa-sm fa-fw"></i>
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose} animation={false} size="xl">
					<Modal.Header closeButton>
						<Modal.Title>Update Info: Patient {this.props.patient.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col xs={4}>
								<img src={this.props.patient.imagePath} alt={"Patient " + this.props.patient.id} />
							</Col>
							<Col xs={8}>
								<Form onSubmit={this.handleSubmit}>
									<fieldset>
										<legend>Personal Information</legend>
										{/* Patient ID */}
										<Form.Group as={Row} controlId={"id"} className="mb-1">
											<Form.Label size="sm" column xs={4}>
												Patient ID:
											</Form.Label>
											<Col xs={8}>
												<Form.Control readOnly type="text" size="sm" defaultValue={this.props.patient.id} />
											</Col>
										</Form.Group>
										{/* Patient Name */}
										<Form.Group as={Row} controlId={"name"} className="mb-1">
											<Form.Label size="sm" column xs={4}>
												Patient Name:
											</Form.Label>
											<Col xs={8}>
												<Form.Control type="text" size="sm" defaultValue={this.props.patient.name} />
											</Col>
										</Form.Group>
										{/* Patient Gender */}
										<Form.Group as={Row} controlId="gender" className="mb-1">
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
													<option defaultValue={this.props.patient.gender}>{this.props.patient.gender}</option>
													<option value="Male">Male</option>
													<option value="Female">Female</option>
													<option value="Other">Other</option>
												</Form.Select>
											</Col>
										</Form.Group>
										{/* Patient Birthday */}
										<Form.Group as={Row} controlId={"dateOfBirth"} className="mb-1">
											<Form.Label size="sm" column xs={4}>
												Date Of Birth:
											</Form.Label>
											<Col xs={8}>
												<Form.Control type="date" size="sm" defaultValue={this.props.patient.dateOfBirth} max={new Date().toJSON().split("T")[0]} />
											</Col>
										</Form.Group>
										{/* Patient ID Card */}
										<Form.Group as={Row} controlId={"identityCard"} className="mb-1">
											<Form.Label size="sm" column xs={4}>
												ID Card:
											</Form.Label>
											<Col xs={8}>
												<Form.Control type="text" size="sm" defaultValue={this.props.patient.identityCard} />
											</Col>
										</Form.Group>
										{/* Patient Insurance */}
										<Form.Group as={Row} controlId={"insurance"} className="mb-1">
											<Form.Label size="sm" column xs={4}>
												Insurance Number:
											</Form.Label>
											<Col xs={8}>
												<Form.Control type="text" size="sm" defaultValue={this.props.patient.healthInsuranceNumber} />
											</Col>
										</Form.Group>
										{/* Patient Phone */}
										<Form.Group as={Row} controlId={"phoneNumber"} className="mb-1">
											<Form.Label size="sm" column xs={4}>
												Phone Number:
											</Form.Label>
											<Col xs={8}>
												<Form.Control type="text" size="sm" defaultValue={this.props.patient.phoneNumber} />
											</Col>
										</Form.Group>
										{/* Patient address */}
										<AddressSelector patient={this.props.patient} />
									</fieldset>
									<fieldset className="mb-3">
										<legend>Vaccination Information</legend>
										<Row>
											{/* Injection No.1 */}
											<Col xs={6}>
												<legend>Injection No.1</legend>
												{/* No.1 Vaccine Name */}
												<Form.Group as={Row} controlId="no1VaccineName" className="mb-1">
													<Form.Label size="sm" column xs={6}>
														Vaccine Name:
													</Form.Label>
													<Col xs={6}>
														<Form.Control
															type="text"
															size="sm"
															defaultValue={!this.props.patient.vaccinationInfo.length ? "" : this.props.patient.vaccinationInfo[0].vaccineName}
														/>
													</Col>
												</Form.Group>
												{/* No.1 Vaccine No */}
												<Form.Group as={Row} controlId="no1VaccineNo" className="mb-1">
													<Form.Label size="sm" column xs={6}>
														Vaccine No:
													</Form.Label>
													<Col xs={6}>
														<Form.Control type="text" size="sm" defaultValue={!this.props.patient.vaccinationInfo.length ? "" : this.props.patient.vaccinationInfo[0].vaccineNo} />
													</Col>
												</Form.Group>
												{/* No.1 Injection Date */}
												<Form.Group as={Row} controlId="no1InjectionDate" className="mb-1">
													<Form.Label size="sm" column xs={6}>
														Injection Date:
													</Form.Label>
													<Col xs={6}>
														<Form.Control
															type="date"
															size="sm"
															defaultValue={!this.props.patient.vaccinationInfo.length ? "" : this.props.patient.vaccinationInfo[0].injectionDate}
															max={new Date().toJSON().split("T")[0]}
														/>
													</Col>
												</Form.Group>
												{/* No.1 Injection Place */}
												<Form.Group as={Row} controlId="no1InjectionPlace" className="mb-1">
													<Form.Label size="sm" column xs={6}>
														Injection Place:
													</Form.Label>
													<Col xs={6}>
														<Form.Control
															type="text"
															size="sm"
															defaultValue={!this.props.patient.vaccinationInfo.length ? "" : this.props.patient.vaccinationInfo[0].injectionPlace}
														/>
													</Col>
												</Form.Group>
											</Col>
											{/* Injection no.2 */}
											<Col xs={6}>
												<legend>Injection No.2</legend>
												{/* no.2 Vaccine Name */}
												<Form.Group as={Row} controlId="no2VaccineName" className="mb-1">
													<Form.Label size="sm" column xs={6}>
														Vaccine Name:
													</Form.Label>
													<Col xs={6}>
														<Form.Control
															type="text"
															size="sm"
															defaultValue={this.props.patient.vaccinationInfo.length <= 1 ? "" : this.props.patient.vaccinationInfo[1].vaccineName}
														/>
													</Col>
												</Form.Group>
												{/* no.2 Vaccine No */}
												<Form.Group as={Row} controlId="no2VaccineNo" className="mb-1">
													<Form.Label size="sm" column xs={6}>
														Vaccine No:
													</Form.Label>
													<Col xs={6}>
														<Form.Control
															type="text"
															size="sm"
															defaultValue={this.props.patient.vaccinationInfo.length <= 1 ? "" : this.props.patient.vaccinationInfo[1].vaccineNo}
														/>
													</Col>
												</Form.Group>
												{/* no.2 Injection Date */}
												<Form.Group as={Row} controlId="no2InjectionDate" className="mb-1">
													<Form.Label size="sm" column xs={6}>
														Injection Date:
													</Form.Label>
													<Col xs={6}>
														<Form.Control
															type="date"
															size="sm"
															defaultValue={this.props.patient.vaccinationInfo.length <= 1 ? "" : this.props.patient.vaccinationInfo[1].injectionDate}
															min={this.props.patient.vaccinationInfo.length <= 1 ? new Date().toJSON().split("T")[0] : this.props.patient.vaccinationInfo[0].injectionDate}
														/>
													</Col>
												</Form.Group>
												{/* no.2 Injection Place */}
												<Form.Group as={Row} controlId="no2InjectionPlace" className="mb-1">
													<Form.Label size="sm" column xs={6}>
														Injection Place:
													</Form.Label>
													<Col xs={6}>
														<Form.Control
															type="text"
															size="sm"
															defaultValue={this.props.patient.vaccinationInfo.length <= 1 ? "" : this.props.patient.vaccinationInfo[1].injectionPlace}
														/>
													</Col>
												</Form.Group>
											</Col>
										</Row>
									</fieldset>
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</Form>
							</Col>
						</Row>
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
export default UpdatePatientInfoModal;
