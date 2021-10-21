import './App.css';
import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import ManagePatients from './components/pages/manage-patients/ManagePatients'
import ManageAccounts from './components/pages/manage-accounts/ManageAccounts'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/manage-patients">
          <ManagePatients />
        </Route>
        <Route exact path="/manage-accounts">
          <ManageAccounts />
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
