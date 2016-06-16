import styles from './Results.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container.jsx';
import ResultBox from '../components/ResultBox.jsx';
import Button from '../components/Button.jsx';
import IconRefresh from 'react-icons/lib/io/refresh';

const mapStateToProps = ({ questionnaire }) => ({
  // TODO: get this data from the store
  results: {
    ak: {
      score: 0.5,
      name: 'Basaalcelcarcinoom',
      description: 'Op een schaal van 0 tot 100, waarbij 0 betekent dat u niet in gevaar bent ' +
        'voor basaal&shy;cel&shy;carcinoom, <strong>scoort u een 50</strong>. Vandaar dat op ' +
        'dit punt het bewijs niet overtuigend is (noch sterk negatief, noch positief).',
    },
    bcc: {
      score: 0.1,
      name: 'Actinische Keratose',
      description: 'Op een schaal van 0 tot 100, waarbij 0 betekent dat u niet in gevaar bent ' +
        'voor actinische keratose, <strong>scoort u een 10</strong>. Dat houdt in dat het ' +
        'niet erg waarschijnlijk is dat u actinische keratose heeft.',
    },
  },
});

const propTypes = {
  results: PropTypes.object,
};

function Results({ results }) {
  return (
    <Container>
      <div className={styles.dummy}>Maakt&nbsp;u&nbsp;zich&nbsp;geen&nbsp;zorgen, dit&nbsp;zijn&nbsp;slechts&nbsp;proef&nbsp;resultaten!</div>
      {
        Object.keys(results)
          .sort((key1, key2) => results[key2].score - results[key1].score)
          .map((key) => (
            <div key={key} className={styles.result}>
              <ResultBox {...results[key]} />
            </div>
          ))
      }
      <Button label="Start opnieuw" icon={<IconRefresh />} onClick={() => location.reload()} />
    </Container>
  );
}

Results.propTypes = propTypes;

export default connect(mapStateToProps)(Results);
