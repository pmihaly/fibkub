import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Fib calculator version 2</h1>
        <br />
        <Link to="/">Home</Link>
        <br />
        <Link to="/otherpage">Other page</Link>
        <div>
          <Route exact path="/" component={Fib}></Route>
          <Route exact path="/otherpage" component={OtherPage}></Route>
        </div>
      </div>
    </Router>
  );
}

export default App;
