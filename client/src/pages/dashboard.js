import React from 'react';
import NavComp from '../components/MainNavbar.js';
import { MainSidebar } from '../components/MainSidebar.js';

class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavComp/>
        <MainSidebar/>
        <div id="main">
            <div className="dashboard-nav-header">
                <p>Dashboard</p>
            </div>            
            <div className="dashboard-nav-footer">
                <div className="dashboard-nav-footer-component">Objectives</div>
                <div className="dashboard-nav-footer-component">Performance</div>
                <div className="dashboard-nav-footer-component">Analytics</div>
                <div className="dashboard-nav-footer-component">Lists and Analytics</div>
                <div className="dashboard-nav-footer-component">Adtivity Feed</div>
            </div>
            <div className="dashboard-body">
              <div className="dashboard-card">
                <div className="dashboard-card-header">
                  Connect Your Sight
                </div>
                <div className="dashboard-card-body">
                  Start turning more visitors into subscribers by building an on-brand signup form with the easy to use, drag and drop form builder.
                </div>  
                <div className="dashboard-card-footer">
                  Read Help Article
                </div>              
              </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;