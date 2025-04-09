import DiagramComponent from './components/DiagramComponent';
import { COMPLEX_NUMBERS, REAL_NUMBERS } from './data/numberData';
import { RenderInputs } from './layout/RectangleLayout';

function App() {
  const renderInputs: RenderInputs[] = [
    { numberSet: COMPLEX_NUMBERS, render: true },
    { numberSet: REAL_NUMBERS, render: true },
    // Add more sets as needed
  ];
  return (
    <div>
      <DiagramComponent renderInputs={renderInputs} />
    </div>
  );
}

export default App;
