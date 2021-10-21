import React from 'react'
import Header from '../../layout/Header';

class ManageAccounts extends React.Component {
    render() {
        return (
            <div className="container">
                <Header name="admin" />
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Manage Accounts</h5>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">Title</h4>
                        <p className="card-text">Text</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default ManageAccounts;