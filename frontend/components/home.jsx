import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return <div className="home">
    <div className="hero">
      <div className="hero-content">
        <h1>Null Pointer Exception</h1>
        <p>This is a thing. A thing that you can do a thing with a thing. Thingy thing.</p>
        <p>This background color hurts my eyes.</p>
        <p>And I almost never use this page when I visit Stack Overflow anyway...</p>
        <Link to="/questions" className="button button-success">See All Questions</Link>
      </div>
    </div>
  </div>
}

export default HomePage;