import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);
  // Define columns for react-table
  const columns = useMemo(
    () => [
      { Header: `ID`, accessor: `id` },
      { Header: `Cat Name`, accessor: `catName` },
      { Header: `Date of Birth`, accessor: `catDateOfBirth` },
      { Header: `Instrument Type`, accessor: `instrumentType` },
      { Header: `Score`, accessor: `score` },
      { Header: `Risk Level`, accessor: `riskLevel` },
    ],
    []
  );
  const data = useMemo(() => assessments, [ assessments ]);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data });
  console.log(`front end:`, { assessments, columns, data, headerGroups });
  return (
    <div>
      {Array.isArray(assessments) && assessments.length > 0 && headerGroups ?
        <table {...getTableProps()} className="table table-striped">
          <thead>
            {headerGroups.map(headerGroup =>
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column =>
                  <th {...column.getHeaderProps()} key={column.id}>{column.render(`Header`)}</th>)}
              </tr>)}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell =>
                    <td {...cell.getCellProps()} key={cell.column.id}>{cell.render(`Cell`)}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table> :
        <p>No assessments found.</p>}
    </div>
  );
};
