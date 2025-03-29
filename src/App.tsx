import React from 'react';

import DiagramComponent from './components/DiagramComponent';
import { NATURAL_NUMBERS } from './data/numberData';

function App() {
  return (
    <div>
      <DiagramComponent numberSet={NATURAL_NUMBERS} />
    </div>
  );
}

export default App;
