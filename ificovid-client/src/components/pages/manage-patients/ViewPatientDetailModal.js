import React from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

class ViewPatientDetailModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			patient: this.props.patient,
			show: false,
		};
	}

	handleClose = () => {
		this.setState({ show: false });
	};
	handleShow = () => {
		this.setState({ show: true });
	};

	render() {
		return (
			<>
				<Button variant="info" size="sm" className="me-1" title="View this patient's details" onClick={this.handleShow}>
					<i className="fas fa-eye fa-sm fa-fw"></i>
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose} animation={false} size="xl">
					<Modal.Header closeButton>
						<Modal.Title>Patient {this.state.patient.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Row>
							<Col xs={3}>
								<img src={this.state.patient.imagePath} alt={"Patient " + this.state.patient.id} />
							</Col>
							<Col xs={9}>
								<fieldset disabled>
									<legend>Personal Information</legend>
									{/* Patient ID */}
									<Form.Group as={Row} controlId="form-group-id" className="mb-1">
										<Form.Label size="sm" column xs={4}>
											Patient ID:
										</Form.Label>
										<Col xs={8}>
											<Form.Control readOnly type="text" size="sm" defaultValue={this.state.patient.id} />
										</Col>
									</Form.Group>
									{/* Patient Name */}
									<Form.Group as={Row} controlId="form-group-id" className="mb-1">
										<Form.Label size="sm" column xs={4}>
											Patient Name:
										</Form.Label>
										<Col xs={8}>
											<Form.Control readOnly type="text" size="sm" defaultValue={this.state.patient.name} />
										</Col>
									</Form.Group>
									{/* Patient Gender */}
									<Form.Group as={Row} controlId="form-group-id" className="mb-1">
										<Form.Label size="sm" column xs={4}>
											Gender:
										</Form.Label>
										<Col xs={8}>
											<Form.Control readOnly type="text" size="sm" defaultValue={this.state.patient.gender} />
										</Col>
									</Form.Group>
									{/* Patient Birthday */}
									<Form.Group as={Row} controlId="form-group-id" className="mb-1">
										<Form.Label size="sm" column xs={4}>
											Date Of Birth:
										</Form.Label>
										<Col xs={8}>
											<Form.Control readOnly type="text" size="sm" defaultValue={this.state.patient.dateOfBirth} />
										</Col>
									</Form.Group>
									{/* Patient ID Card */}
									<Form.Group as={Row} controlId="form-group-id" className="mb-1">
										<Form.Label size="sm" column xs={4}>
											ID Card:
										</Form.Label>
										<Col xs={8}>
											<Form.Control readOnly type="text" size="sm" defaultValue={this.state.patient.identityCard} />
										</Col>
									</Form.Group>
									{/* Patient Insurance */}
									<Form.Group as={Row} controlId="form-group-id" className="mb-1">
										<Form.Label size="sm" column xs={4}>
											Insurance Number:
										</Form.Label>
										<Col xs={8}>
											<Form.Control readOnly type="text" size="sm" defaultValue={this.state.patient.healthInsuranceNumber} />
										</Col>
									</Form.Group>
									{/* Patient Address */}
									<Form.Group as={Row} controlId="form-group-id" className="mb-1">
										<Form.Label size="sm" column xs={4}>
											Address:
										</Form.Label>
										<Col xs={8}>
											<Form.Control
												readOnly
												type="text"
												size="sm"
												defaultValue={
													this.state.patient.address.street +
													", " +
													this.state.patient.address.ward +
													", " +
													this.state.patient.address.district +
													", " +
													this.state.patient.address.city
												}
											/>
										</Col>
									</Form.Group>
									{/* Patient Phone */}
									<Form.Group as={Row} controlId="form-group-id" className="mb-1">
										<Form.Label size="sm" column xs={4}>
											Phone Number:
										</Form.Label>
										<Col xs={8}>
											<Form.Control readOnly type="text" size="sm" defaultValue={this.state.patient.phoneNumber} />
										</Col>
									</Form.Group>
								</fieldset>
								<fieldset disabled>
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
														readOnly
														type="text"
														size="sm"
														defaultValue={!this.state.patient.vaccinationInfo.length ? "" : this.state.patient.vaccinationInfo[0].vaccineName}
													/>
												</Col>
											</Form.Group>
											{/* No.1 Vaccine No */}
											<Form.Group as={Row} controlId="no1VaccineNo" className="mb-1">
												<Form.Label size="sm" column xs={6}>
													Vaccine No:
												</Form.Label>
												<Col xs={6}>
													<Form.Control
														readOnly
														type="text"
														size="sm"
														defaultValue={!this.state.patient.vaccinationInfo.length ? "" : this.state.patient.vaccinationInfo[0].vaccineNo}
													/>
												</Col>
											</Form.Group>
											{/* No.1 Injection Date */}
											<Form.Group as={Row} controlId="no1InjectionDate" className="mb-1">
												<Form.Label size="sm" column xs={6}>
													Injection Date:
												</Form.Label>
												<Col xs={6}>
													<Form.Control
														readOnly
														type="text"
														size="sm"
														defaultValue={!this.state.patient.vaccinationInfo.length ? "" : this.state.patient.vaccinationInfo[0].injectionDate}
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
														readOnly
														type="text"
														size="sm"
														defaultValue={!this.state.patient.vaccinationInfo.length ? "" : this.state.patient.vaccinationInfo[0].injectionPlace}
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
														readOnly
														type="text"
														size="sm"
														defaultValue={this.state.patient.vaccinationInfo.length <= 1 ? "" : this.state.patient.vaccinationInfo[1].vaccineName}
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
														readOnly
														type="text"
														size="sm"
														defaultValue={this.state.patient.vaccinationInfo.length <= 1 ? "" : this.state.patient.vaccinationInfo[1].vaccineNo}
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
														readOnly
														type="text"
														size="sm"
														defaultValue={this.state.patient.vaccinationInfo.length <= 1 ? "" : this.state.patient.vaccinationInfo[1].injectionDate}
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
														readOnly
														type="text"
														size="sm"
														defaultValue={this.state.patient.vaccinationInfo.length <= 1 ? "" : this.state.patient.vaccinationInfo[1].injectionPlace}
													/>
												</Col>
											</Form.Group>
										</Col>
									</Row>
								</fieldset>
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
export default ViewPatientDetailModal;
