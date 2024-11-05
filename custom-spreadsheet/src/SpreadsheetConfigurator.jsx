import React, { useState } from 'react';
import SpreadsheetComponent from './SpreadsheetComponent';
import './Spreadsheet.css';

const SpreadsheetConfigurator = () => {
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [showSpreadsheet, setShowSpreadsheet] = useState(false);

  const handleCreateSpreadsheet = () => {
    setShowSpreadsheet(true); // Hide configurator and show spreadsheet
  };

  return (
    <div>
      {!showSpreadsheet && (
        <div id="configurator">
          <h2>Configure Your Spreadsheet</h2>
          <label>
            Rows:
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              min="1"
            />
          </label>
          <label>
            Columns:
            <input
              type="number"
              value={cols}
              onChange={(e) => setCols(Number(e.target.value))}
              min="1"
            />
          </label>
          <button onClick={handleCreateSpreadsheet}>Create Spreadsheet</button>
        </div>
      )}
      
      {showSpreadsheet && <SpreadsheetComponent rows={rows} cols={cols} />}
    </div>
  );
};

export default SpreadsheetConfigurator;
