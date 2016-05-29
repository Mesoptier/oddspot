import React from 'react';
import { Link } from 'react-router';

function Home() {
  return (
    <div>
      <h1>OddSpot</h1>
      <p>
        This app evaluates a small spot on your skin for evidence of two potential precursors of
        skin cancer: <em>Actinic Keratosis</em> and <em>Basal Cell Carcinoma</em>.
      </p>
      <p>
        Please note: <strong>when in doubt, consult your physician</strong>.
      </p>
      <Link to="/questionnaire">Start questionnaire</Link>
    </div>
  )
}

export default Home;
