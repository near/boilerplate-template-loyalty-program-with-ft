import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '../assets/global.css';
import CustomerView from '../modules/CustomerView';
import MarchantView from '../modules/MarchantView';

const App = ({ factory, wallet, customer }) => (
  <Router>
    <div className="main">
      <Routes>
        <Route exact path="/" element={<MarchantView factory={factory} wallet={wallet} customer={customer} />}></Route>
        <Route
          path="/customer/:merchantAddress?"
          element={<CustomerView factory={factory} wallet={wallet} customer={customer} />}
        ></Route>
      </Routes>
    </div>
  </Router>
);

export default App;
