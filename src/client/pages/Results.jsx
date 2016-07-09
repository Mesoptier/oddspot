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
