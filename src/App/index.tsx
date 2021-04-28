import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import Counter from '../Components/Counter/Counter';
import Employee from '../Components/Employee/Employee';
import EditEmployee from '../Components/Employee/EditEmployee';
import CreateEmployee from '../Components/Employee/CreateEmployee';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function App() {
  return <>
    <div className="App">
      <Container>
        <Header />
        <div className="p-t-50">
          <BrowserRouter>​
            <Switch>​
              <Route exact path={'/'} component={Counter} />
              <Route exact path={'/Employee'} component={Employee} />
              <Route exact path={'/CreateEmployee'} component={CreateEmployee} />
              <Route exact path={'/EditEmployee/:id'} component={EditEmployee} />          
              <Route render={() => <Redirect to={{pathname: "/"}} />} />​​​
            </Switch>​
          </BrowserRouter>
        </div>
        <Footer />        
      </Container>
    </div>
  </>
}

export default App;
