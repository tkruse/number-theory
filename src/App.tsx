import React from 'react';

import RepresentativeNumberComponent from "./components/RepresentativeNumberComponent";
import NumberSetComponent from "./components/NumberSetComponent";
import { NATURAL_NUMBERS, ZERO } from "./data/numberData";

function App() {
    return (
        <div>
            <RepresentativeNumberComponent repNumber={ZERO} x={50} y={50} />
            <NumberSetComponent numberSet={NATURAL_NUMBERS} x={10} y={10} colorIndex={0} />
        </div>
    );
}

export default App;
