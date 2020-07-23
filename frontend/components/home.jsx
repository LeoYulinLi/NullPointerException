import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return <div className="home">
    <div className="hero">
      <div className="hero-content">
        <h1>Null Pointer Exception</h1>
        <p>We build products that empower developers and connect them to solutions that enable productivity,
          growth, and discovery.</p>
        <Link to="/questions" className="button button-success">See All Questions</Link>
      </div>
    </div>
  </div>
}

export default HomePage;