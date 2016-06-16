import './styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './configureStore';
import { setQuestions } from './reducers/questionnaire';

import ClientApp from './containers/ClientApp.jsx';
import Home from './pages/Home.jsx';
import Questionnaire from './pages/Questionnaire.jsx';
import Results from './pages/Results.jsx';

const store = configureStore();
const history = syncHistoryWithStore(createMemoryHistory(), store);

// Set initial data
// const initialData = window.INITIAL_DATA;
const initialData = {
  questionnaire: {
    questions: [
      {
        type: 'question',
        questionIndex: 1,
        question: 'Bent u een man of een vrouw?',
        description: null,
        choices: [
          {
            label: 'Man',
            value: 0
          },
          {
            label: 'Vrouw',
            value: 1
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 2,
        question: 'Zijn er periodes in uw leven geweest waarbij u langere tijd aaneengesloten in een gebied bent verbleven met veel zon?',
        description: 'Bijvoorbeeld doordat u in de tropen of in een mediterraan land heeft gewoond.',
        choices: [
          {
            label: 'Ja',
            value: 0
          },
          {
            label: 'Nee',
            value: 1
          },
          {
            label: 'Dit weet ik niet',
            value: 2
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 3,
        question: 'Bent u vaak op zonvakantie geweest?',
        description: 'Met het doel om te zonnen.',
        choices: [
          {
            label: 'Vaak',
            value: 0
          },
          {
            label: 'Regelmatig',
            value: 1
          },
          {
            label: 'Soms',
            value: 2
          },
          {
            label: 'Zelden',
            value: 3
          },
          {
            label: 'Nooit',
            value: 4
          }
        ]
      },
      {
        type: 'help',
        help: 'Kies nu een plekje op uw huid uit dat\u00a0u\u00a0wilt\u00a0diagnosticeren.'
      },
      {
        type: 'question',
        questionIndex: 4,
        question: 'Bloedt het plekje?',
        description: 'Bloeden zou zich voor kunnen doen als u uzelf afdroogt na het douchen.',
        choices: [
          {
            label: 'Ja',
            value: 0
          },
          {
            label: 'Soms',
            value: 1
          },
          {
            label: 'Nee',
            value: 2
          },
          {
            label: 'Weet ik niet',
            value: 3
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 5,
        question: 'Zit het plekje op een plek waar het direct zonlicht krijgt?',
        description: 'Bijvoorbeeld op uw gezicht, oren, onderarmen, handrug of op de bovenkant van uw hoofd.',
        choices: [
          {
            label: 'Ja',
            value: 0
          },
          {
            label: 'Nee',
            value: 1
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 6,
        question: 'Wat is de kleur van het plekje?',
        description: null,
        choices: [
          {
            label: 'Huidkleurig',
            value: 0
          },
          {
            label: 'Licht rood',
            value: 1
          },
          {
            label: 'Donker rood',
            value: 2
          },
          {
            label: 'Fel rood',
            value: 3
          },
          {
            label: 'Bruin',
            value: 4
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 7,
        question: 'Wat voor een vorm heeft het plekje?',
        description: 'Platte plekjes kunt u alleen zien, niet voelen met uw vingers. Verhoogde plekjes kunt u voelen bij aanraking en ook vanaf de zijkant zien.',
        choices: [
          {
            label: 'Plat',
            value: 0
          },
          {
            label: 'Verhoogd',
            value: 1
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 8,
        question: 'Hoe ruw is het plekje?',
        description: null,
        choices: [
          {
            label: 'Helemaal niet',
            value: 0
          },
          {
            label: 'Het voelt ruw',
            value: 1
          },
          {
            label: 'Het voelt ruw en ziet er ook ruw uit',
            value: 2
          },
          {
            label: 'Het is een ruw, dik, geelachtig plekje',
            value: 3
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 9,
        question: 'Is er een verdikking onder de huid?',
        description: 'Bijvoordbeeld knobbeltjes of zwellingen, waarbij de huid zichtbaar naar boven/buiten gedrukt wordt.',
        choices: [
          {
            label: 'Ja',
            value: 0
          },
          {
            label: 'Nee',
            value: 1
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 10,
        question: 'Glimt of glanst het plekje?',
        description: null,
        choices: [
          {
            label: 'Ja',
            value: 0
          },
          {
            label: 'Nee',
            value: 1
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 11,
        question: 'Zijn er kleine verwijde bloedvaten rond het plekje?',
        description: 'Dit ziet u door de aanwezigheid van rode kronkelige lijntjes vlak onder de huid rondom het plekje.',
        choices: [
          {
            label: 'Ja',
            value: 0
          },
          {
            label: 'Nee',
            value: 1
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 12,
        question: 'Is het plekje een wond?',
        description: 'Is het plekje bijvoorbeeld open of ziet u verzwering van de huid?',
        choices: [
          {
            label: 'Ja',
            value: 0
          },
          {
            label: 'Nee',
            value: 1
          }
        ]
      },
      {
        type: 'question',
        questionIndex: 13,
        question: 'Hoe oud bent u?',
        questionType: 'number',
        inputPlaceholder: 'Leeftijd',
      }
    ]
  }
};

store.dispatch(setQuestions(initialData.questionnaire.questions));

const root = document.getElementById('root');

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={ClientApp}>
        <IndexRoute component={Home} />
        <Route path="questionnaire" component={Questionnaire} />
        <Route path="results" component={Results} />
      </Route>
    </Router>
  </Provider>
), root);
