import React from "react";
import { Button, Modal } from "react-bootstrap";

class DeleteConfirmationModal extends React.Component {
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

	handleDelete = () => {
		const requestOptions = {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		};
		fetch(`/patient/${this.props.patient.id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.props.onDeletePatient();
				this.handleClose();
			});
	};

	render() {
		return (
			<>
				<Button variant="danger" size="sm" title="Delete this patient" onClick={this.handleShow}>
					<i className="fas fa-trash fa-sm fa-fw"></i>
				</Button>

				<Modal show={this.state.show} onHide={this.handleClose} animation={false} size="md">
					<Modal.Header closeButton>
						<Modal.Title>Delete patient {this.props.patient.name} ?</Modal.Title>
					</Modal.Header>
					<Modal.Body>The patient {this.props.patient.name} will be deleted. Are you sure you want to continue?</Modal.Body>
					<Modal.Footer>
						<Button variant="danger" onClick={this.handleDelete}>
							Delete
						</Button>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
export default DeleteConfirmationModal;
