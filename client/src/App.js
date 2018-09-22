import React, { Component } from "react";
import "./App.css";

// Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Landing />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
