import React from 'react';
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
  const handleCheckboxChange = (set: INumberSet) => {
    setEnabledNumberSets((prev) => {
      const newMap = new Map(prev);
      newMap.set(set, !newMap.get(set));
      return newMap;
    });
  };

  return (
    <div className="number-set-chooser">
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
  );
};

export default NumberSetChooser;
