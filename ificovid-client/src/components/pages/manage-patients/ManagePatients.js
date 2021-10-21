import React from 'react'
import Header from '../../layout/Header';
import PatientTable from './PatientTable';

class ManagePatients extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            patients: []
        };
    }


    render() {
        return (
            <div className="container" >
                <Header name="admin" />
                <PatientTable />
            </div>
        );
    }

}
export default ManagePatients;