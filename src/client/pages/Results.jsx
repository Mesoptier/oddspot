import styles from './Results.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ResultBox from '../components/ResultBox.jsx';

const mapStateToProps = ({ questionnaire }) => ({
  // TODO: get this data from the store
  results: {
    ak: {
      score: 0.5,
      name: 'Basal Cell Carcinoma',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ' +
        'fringilla urna vitae sodales. Cras aliquet arcu non ultrices volutpat. Nullam nisi ' +
        'tortor, condimentum id ex vel, iaculis maximus orci.',
    },
    bcc: {
      score: 0.1,
      name: 'Actinic Keratosis',
      description: 'Proin eros turpis, elementum quis vehicula vitae, commodo in libero. Aenean ' +
        'et quam dolor. Nulla velit arcu, aliquam ultrices egestas nec, vulputate et libero.',
    },
  },
});

const propTypes = {
  results: PropTypes.object,
};

function Results({ results }) {
  return (
    <div className={styles.results}>
      {
        Object.keys(results).map((key) => (
          <div key={key} className={styles.result}>
            <ResultBox {...results[key]} />
          </div>
        ))
      }
    </div>
  );
}

Results.propTypes = propTypes;

export default connect(mapStateToProps)(Results);
