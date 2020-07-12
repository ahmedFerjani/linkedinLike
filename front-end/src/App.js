import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import NotFound from "./components/NotFound";
function App() {
  return (
    <Router>
      <div className="App">
        <div id="main-wrapper">
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/**' component={NotFound} />
          <Footer />
        </div>
        <MobileNav />
      </div>
    </Router>
  );
}

export default App;
