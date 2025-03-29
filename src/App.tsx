import DiagramComponent from './components/DiagramComponent';
import { REAL_NUMBERS } from './data/numberData';

function App() {
  return (
    <div>
      <DiagramComponent numberSet={REAL_NUMBERS} />
    </div>
  );
}

export default App;
