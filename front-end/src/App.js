import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import NotFound from "./components/NotFound";
import Alert from './components/Alert'
//Redux
import { Provider } from "react-redux";
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div id="main-wrapper">
            <Header />
            <Alert />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="*" component={NotFound} />
            </Switch>
            <Footer />
          </div>
          <MobileNav />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
