import styles from './Results.scss';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container.jsx';
import ResultBox from '../components/ResultBox.jsx';
import Button from '../components/Button.jsx';
import IconRefresh from 'react-icons/lib/io/refresh';
import { calculateResults } from '../reducers/questionnaire';

const mapStateToProps = ({ questionnaire }) => ({
  results: questionnaire.results,
  // results: {
  //   ak: {
  //     score: 0.5,
  //     name: 'Basaalcelcarcinoom',
  //     description: 'Op een schaal van 0 tot 100, waarbij 0 betekent dat u niet in gevaar bent ' +
  //       'voor basaal&shy;cel&shy;carcinoom, <strong>scoort u een 50</strong>. Vandaar dat op ' +
  //       'dit punt het bewijs niet overtuigend is (noch sterk negatief, noch positief).',
  //   },
  //   bcc: {
  //     score: 0.1,
  //     name: 'Actinische Keratose',
  //     description: 'Op een schaal van 0 tot 100, waarbij 0 betekent dat u niet in gevaar bent ' +
  //       'voor actinische keratose, <strong>scoort u een 10</strong>. Dat houdt in dat het ' +
  //       'niet erg waarschijnlijk is dat u actinische keratose heeft.',
  //   },
  // },
});

const mapDispatchToProps = {
  calculateResults,
};

const propTypes = {
  results: PropTypes.object,
  calculateResults: PropTypes.func,
};

class Results extends Component {

  componentDidMount() {
    this.props.calculateResults();
  }

  render() {
    const { results } = this.props;

    if (!results) {
      return (<Container></Container>);
    }

    return (
      <Container>
        {
          Object.keys(results)
            .sort((key1, key2) => results[key2].score - results[key1].score)
            .map((key) => (
              <div key={key} className={styles.result}>
                <ResultBox {...results[key]} />
              </div>
            ))
        }
        {/* <Button label="Bereken opnieuw" onClick={() => this.props.calculateResults()} /> */}
        <Button label="Start opnieuw" icon={<IconRefresh />} onClick={() => location.reload()} />
      </Container>
    );
  }

}

Results.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Results);
