import React from 'react';

import RepresentativeNumberRenderer from './components/RepresentativeNumberRenderer';
import DiagramComponent from './components/DiagramComponent';
import { NATURAL_NUMBERS, ZERO } from './data/numberData';

function App() {
  return (
    <div>
      <DiagramComponent numberSet={NATURAL_NUMBERS} />
    </div>
  );
}

export default App;
