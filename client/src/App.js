import React from 'react';
import { Switch , Route } from "react-router-dom";
import { Provider } from "react-redux";

import Dashboard from './pages/dashboard.js';
import Flow from './pages/flows.js';
import FlowLayout from './pages/createFlowLayout.js';
import Email from './pages/email.js';
import Campaigns from './pages/campaigns.js';
import ListsAndSegments from './pages/listsAndSegments.js';
import CreateSegment from './pages/createSegment.js';
import CampaignCreate from './pages/createCampaigns.js';
import CampaignMail from './pages/campaignMail.js';
import EmailTemplate from './pages/createEmailLayout.js';
import Register from './pages/userRegister.js';
import Login from './pages/userLogin.js';
import Logout from './pages/logout.js';
import ProtectedRoute from './components/protectedRoute.js';
import CreateList from "./pages/createList.js"

import store from './store.js';
import { loadUser } from './actions/authActions.js';

class App extends React.Component {
  
  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return (
    <Provider store={store}>      
      <Switch>    
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>        
        <ProtectedRoute exact path="/" component={Dashboard} />
        <ProtectedRoute exact path="/logout" component={Logout} />
        <ProtectedRoute exact path="/flow" component={Flow} />
        <ProtectedRoute exact path="/campaigns" component={Campaigns} />
        <ProtectedRoute exact path="/lists-campaigns" component={ListsAndSegments} />
        <ProtectedRoute exact path="/segment/create" component={CreateSegment} />
        <ProtectedRoute exact path="/list/create" component={CreateList} />
        <ProtectedRoute exact path="/campaigns/create" component={CampaignCreate} />
        <ProtectedRoute exact path="/campaigns/create/mail-content" component={CampaignMail}/>
        <ProtectedRoute exact path="/flow/create" component={FlowLayout} />
        <ProtectedRoute exact path="/email-templates" component={Email} />
        <ProtectedRoute exact path="/email-templates/create" component={EmailTemplate} />    
      </Switch>
    </Provider>
  );  
  }
}

export default App;
