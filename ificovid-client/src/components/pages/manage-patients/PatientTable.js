import React from 'react'
import { Table } from 'react-bootstrap'
import ViewPatientDetailModal from './ViewPatientDetailModal'

class PatientTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            patients: [],
        }
        // $("#patientTable").DataTable();
    }
    componentDidMount() {
        fetch("/patient/all")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    patients: data
                });
            });
    }

    renderTableData() {
        return this.state.patients.map((patient, index) => {
            return (
                <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td><img src={patient.imagePath} alt={"Patient " + patient.id} /></td>
                    <td>{patient.name}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.dateOfBirth}</td>
                    <td>{patient.address.street + "," + patient.address.ward + "," + patient.address.district + "," + patient.address.city}</td>
                    <td>{patient.identityCard}</td>
                    <td>
                        <ViewPatientDetailModal patient={patient} />
                    </td>

                </tr>

            );
        });
    }

    render() {
        return (
            <Table striped id="patientTable">
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
                <tbody>
                    {this.renderTableData()}
                </tbody>
            </Table >
        );
    }
}
export default PatientTable;

