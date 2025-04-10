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
    <div className="app-container">
      <div className="title-legend-container">
        <h1>Numbers Chart</h1>
        <p>
          This diagram illustrates various number sets. Each area is empty unless
          the diagram shows any representative number. You can click on a label to
          open its Wikipedia page, and hover over elements to see descriptions.
        </p>
      </div>
      <div className="diagram-container">
        <DiagramComponent renderInputs={renderInputs} />
      </div>
      <footer className="footer">
        <a href="https://github.com/tkruse/number-theory" target="_blank" rel="noopener noreferrer">
          <img src="/github-mark.svg" alt="GitHub" className="github-icon" />
        </a>
      </footer>
    </div>
  );
}

export default App;
