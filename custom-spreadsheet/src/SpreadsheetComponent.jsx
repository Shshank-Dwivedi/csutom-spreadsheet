import React, { useState } from 'react';
import './Spreadsheet.css';

const SpreadsheetComponent = ({ rows, cols }) => {
  const [data, setData] = useState(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""))
  );

  const [isSelecting, setIsSelecting] = useState(false);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);

  const isCellInRange = (row, col) => {
    if (!startCell || !endCell) return false;
    const [startRow, startCol] = startCell;
    const [endRow, endCol] = endCell;
    return (
      row >= Math.min(startRow, endRow) &&
      row <= Math.max(startRow, endRow) &&
      col >= Math.min(startCol, endCol) &&
      col <= Math.max(startCol, endCol)
    );
  };

  const handleChange = (row, col, value) => {
    const newData = [...data];
    if (isCellInRange(row, col)) {
      for (let r = Math.min(startCell[0], endCell[0]); r <= Math.max(startCell[0], endCell[0]); r++) {
        for (let c = Math.min(startCell[1], endCell[1]); c <= Math.max(startCell[1], endCell[1]); c++) {
          newData[r][c] = value;
        }
      }
    } else {
      newData[row][col] = value;
    }
    setData(newData);
  };

  const handleMouseDown = (row, col) => {
    setIsSelecting(true);
    setStartCell([row, col]);
    setEndCell([row, col]);
  };

  const handleMouseEnter = (row, col) => {
    if (isSelecting) {
      setEndCell([row, col]);
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  const getColumnHeader = (colIndex) => String.fromCharCode(65 + colIndex);

  const handlePaste = (e, row, col) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData("text/plain");

    const rows = clipboardData.split("\n").map(row => row.split("\t"));

    const newData = [...data];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < rows[r].length; c++) {
        const newRow = row + r;
        const newCol = col + c;
        if (newRow < data.length && newCol < data[0].length) {
          newData[newRow][newCol] = rows[r][c];
        }
      }
    }
    setData(newData);
  };

  return (
    <table
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <thead>
        <tr>
          <th></th>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <th key={colIndex}>{getColumnHeader(colIndex)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <th>{rowIndex + 1}</th>
            {row.map((cell, colIndex) => (
              <td
                key={colIndex}
                className={isCellInRange(rowIndex, colIndex) ? 'selected' : ''}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              >
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  onPaste={(e) => handlePaste(e, rowIndex, colIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpreadsheetComponent;
