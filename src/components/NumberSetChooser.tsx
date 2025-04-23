import React, { useState } from 'react';
import { INumberSet } from '../data/numberData';

interface NumberSetChooserProps {
  enabledNumberSets: Map<INumberSet, boolean>;
  setEnabledNumberSets: React.Dispatch<
    React.SetStateAction<Map<INumberSet, boolean>>
  >;
}

const NumberSetChooser: React.FC<NumberSetChooserProps> = ({
  enabledNumberSets,
  setEnabledNumberSets,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleCheckboxChange = (set: INumberSet) => {
    setEnabledNumberSets((prev) => {
      const newMap = new Map(prev);
      newMap.set(set, !newMap.get(set));
      return newMap;
    });
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <button
        className="number-set-chooser-toggle"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls="number-set-chooser-list"
        style={{
          marginBottom: '10px',
          padding: '6px 16px',
          borderRadius: '4px',
          border: '1px solid #aaa',
          background: '#f8f8f8',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {expanded ? 'Hide Number Sets' : 'Show Number Sets'}
      </button>
      {expanded && (
        <div className="number-set-chooser" id="number-set-chooser-list">
          {Array.from(enabledNumberSets.keys()).map((set) => (
            <div key={set.name}>
              <label>
                <input
                  type="checkbox"
                  checked={enabledNumberSets.get(set)}
                  onChange={() => {
                    handleCheckboxChange(set);
                  }}
                />
                {set.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NumberSetChooser;
