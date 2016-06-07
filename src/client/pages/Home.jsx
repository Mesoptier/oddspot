import React from 'react';
import { Link } from 'react-router';
import Container from '../components/Container.jsx';
import Button from '../components/Button.jsx';
import Logo from '../components/Logo.jsx';
import Paragraph from '../components/Paragraph.jsx';
import IconArrowRight from 'react-icons/lib/io/chevron-right';

function Home() {
  return (
    <Container center>
      <Logo />
      <Paragraph justify>
        Deze website evalueert samen met u een klein plekje op uw huid voor aanwijzingen van twee potentiële voorbodes van huidkanker: <em>actinische keratose</em> en <em>basaalcelcarcinoom</em>.
      </Paragraph>
      <Paragraph justify>
        Let op: <strong>ga bij twijfel altijd naar uw arts</strong>.
      </Paragraph>
      <Paragraph justify>
        Ontwikkeld door de Human-Technology Interaction group aan de Technische Universiteit Eindhoven.
      </Paragraph>
      <Button
        element={Link}
        to="/questionnaire"
        kind="primary"
        center
        label="Begin vragenlijst"
        icon={<IconArrowRight />}
        style={{ marginTop: '1rem'}}
      />
    </Container>
  )
}

export default Home;
