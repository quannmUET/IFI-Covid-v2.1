import React from "react";
import Header from "../../layout/Header";
import PatientTable from "./PatientTable";

class ManagePatients extends React.Component {
	render() {
		return (
			<div className="container">
				<Header username="admin" />
				<PatientTable />
			</div>
		);
	}
}
export default ManagePatients;
