import React from 'react';
import { Link } from 'react-router';
import Container from '../components/Container.jsx';
import Button from '../components/Button.jsx';
import Logo from '../components/Logo.jsx';
import Paragraph from '../components/Paragraph.jsx';

function Home() {
  return (
    <Container>
      <Logo />
      <Paragraph justify>
        This app evaluates a small spot on your skin for evidence of two potential precursors of
        skin cancer: <em>Actinic Keratosis</em> and <em>Basal Cell Carcinoma</em>.
      </Paragraph>
      <Paragraph justify>
        Please note: <strong>when in doubt, consult your physician</strong>.
      </Paragraph>
      <Button
        element={Link}
        to="/questionnaire"
        kind="primary"
        center
        style={{ marginTop: '1rem'}}
      >
        Start questionnaire
      </Button>
    </Container>
  )
}

export default Home;
