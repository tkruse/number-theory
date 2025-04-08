import DiagramComponent from './components/DiagramComponent';
import { COMPLEX_NUMBERS } from './data/numberData';

function App() {
  return (
    <div>
      <DiagramComponent numberSet={COMPLEX_NUMBERS} />
    </div>
  );
}

export default App;
