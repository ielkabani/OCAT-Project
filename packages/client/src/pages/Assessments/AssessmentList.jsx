import React, { useEffect, useMemo, useState } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { set } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const AssessmentList = () => {
  const [ globalFilter, setGlobalFilter ] = useState(``);
  const [ assessments, setAssessments ] = useState([]);
  const [ filters, setFilters ] = useState({
    catDateOfBirth: ``,
    catName: ``,
    createdAt: ``,
    id: ``,
    instrumentType: ``,
    riskLevel: ``,
    score: ``,
  });
  // Pagination using 10 rows per page
  const [ page, setPage ] = useState(1);
  const [ pageSize ] = useState(10);
  const [ totalPages, setTotalPages ] = useState(1);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      const result = await AssessmentService.getList({ ...filters, page, pageSize });
      //    setAssessments(await AssessmentService.getList(filters));
      setAssessments(result.assessments || []);
      setTotalPages(result.totalPages || 1);

    };
    fetchAssessments();
  }, [ filters, page, pageSize ]);
  // Handle filter input changes
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // Reset to first page on filter change
  };
  // Handle delete action
  const handleDelete = async (id) => {
    await AssessmentService.delete(id);
    setAssessments(assessments.filter(a => a.id !== id));
  };
  // Define columns for react-table
  const columns = useMemo(
    () => [
      { Header: `ID`, accessor: `id` },
      { Header: `Cat Name`, accessor: `catName` },
      { Header: `Date of Birth`, accessor: `catDateOfBirth` },
      { Header: `Instrument Type`, accessor: `instrumentType` },
      { Header: `Score`, accessor: `score` },
      { Header: `Risk Level`, accessor: `riskLevel` },
      { Header: `Created At`, accessor: `createdAt` },
      {
        Cell: ({ row }) =>
          <button onClick={() => handleDelete(row.original.id)}
            style={{ color: `blue`, cursor: `pointer` }}
          >Delete
          </button>,
        Header: `Actions`,
        accessor: `actions`,
      },
    ],
    [ assessments ]
  );
  const data = useMemo(() => assessments, [ assessments ]);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    setGlobalFilter: setTableGlobalFilter,
  } = useTable({ columns, data, globalFilter }, useGlobalFilter, useSortBy);

  useEffect(() => {
    setTableGlobalFilter(globalFilter);
  }, [ globalFilter, setTableGlobalFilter ]);

  return (
    <div>
      {/* Global Search */}
      <div style={{ marginBottom: `1rem` }}>
        <input
          type="text"
          placeholder="Search all fields..."
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          style={{ padding: 6, width: 300 }}
        />
      </div>
      {/* Filter Controls */}
      <div style={{ display: `flex`, flexWrap: `wrap`, gap: `0.5rem`, marginBottom: `1rem` }}>
        <input
          name="id"
          placeholder="Filter by ID"
          value={filters.id}
          onChange={handleChange}
          style={{ width: 120 }}
        />
        <input
          name="catName"
          placeholder="Filter by Cat Name"
          value={filters.catName}
          onChange={handleChange}
          style={{ width: 140 }}
        />
        <input
          name="catDateOfBirth"
          placeholder="Filter by Date of Birth"
          value={filters.catDateOfBirth}
          onChange={handleChange}
          style={{ width: 160 }}
        />
        <input
          name="instrumentType"
          placeholder="Filter by Instrument Type"
          value={filters.instrumentType}
          onChange={handleChange}
          style={{ width: 160 }}
        />
        <input
          name="score"
          placeholder="Filter by Score"
          value={filters.score}
          onChange={handleChange}
          style={{ width: 120 }}
        />
        <input
          name="riskLevel"
          placeholder="Filter by Risk Level"
          value={filters.riskLevel}
          onChange={handleChange}
          style={{ width: 140 }}
        />
        <input
          name="createdAt"
          placeholder="Filter by Created At"
          value={filters.createdAt}
          onChange={handleChange}
          style={{ width: 160 }}
        />
      </div>
      {Array.isArray(assessments) && assessments.length > 0 && headerGroups ?
        <table {...getTableProps()} style={{ borderCollapse: `collapse`, width: `100%` }}>
          <thead>
            {headerGroups.map(headerGroup =>
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column =>
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    style={{
                      background: `#f4f4f4`,
                      border: `1px solid #ddd`,
                      cursor: `pointer`,
                      padding: `8px`,
                    }}
                  >
                    {column.render(`Header`)}
                    {column.isSorted ? column.isSortedDesc ? `🔽` : `🔼` : ``}
                  </th>)}
              </tr>)}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell =>
                    <td {...cell.getCellProps()} key={cell.column.id}
                      style={{ border: `1px solid #ddd`, padding: `8px` }}>
                      {cell.render(`Cell`)}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table> :
        <p>No assessments found.</p>}
      {/* Pagination Controls */}
      <div style={{ marginTop: `1rem` }}>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</button>
        <span style={{ margin: `0 1rem` }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Next</button>
      </div>
    </div>
  );
};
