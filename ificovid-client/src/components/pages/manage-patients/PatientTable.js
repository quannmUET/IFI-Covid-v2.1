import React from "react";
import { Table, Card } from "react-bootstrap";
import AddPatientModal from "./AddPatientModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UpdatePatientInfoModal from "./UpdatePatientInfoModal";
import ViewPatientDetailModal from "./ViewPatientDetailModal";

class PatientTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			patients: [],
		};
	}
	componentDidMount() {
		fetch("/patient/all")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ patients: data });
			});
	}
	onAddPatient = () => {
		fetch("/patient/all")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ patients: data });
			});
	};

	onUpdatePatient = () => {
		fetch("/patient/all")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ patients: data });
			});
	};

	onDeletePatient = () => {
		fetch("/patient/all")
			.then((response) => response.json())
			.then((data) => {
				this.setState({ patients: data });
			});
	};

	renderTableData() {
		return this.state.patients.map((patient, index) => {
			return (
				<tr key={patient.id}>
					<td>{patient.id}</td>
					<td>
						<img src={patient.imagePath} alt={"Patient " + patient.id} />
					</td>
					<td>{patient.name}</td>
					<td>{patient.gender}</td>
					<td>{patient.dateOfBirth}</td>
					<td>{patient.address.street + "," + patient.address.ward + "," + patient.address.district + "," + patient.address.city}</td>
					<td>{patient.identityCard}</td>
					<td>
						<ViewPatientDetailModal patient={patient} />
						<UpdatePatientInfoModal patient={patient} onUpdatePatient={this.onUpdatePatient} />
						<DeleteConfirmationModal patient={patient} onDeletePatient={this.onDeletePatient} />
					</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<Card>
				<Card.Header>
					<AddPatientModal onAddPatient={this.onAddPatient} />
				</Card.Header>
				<Card.Body className="p-0">
					<Table striped>
						<thead>
							<tr>
								<th>ID</th>
								<th>Image</th>
								<th>Name</th>
								<th>Gender</th>
								<th>Birthday</th>
								<th>Address</th>
								<th>ID Card</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>{this.renderTableData()}</tbody>
					</Table>
				</Card.Body>
			</Card>
		);
	}
}
export default PatientTable;
