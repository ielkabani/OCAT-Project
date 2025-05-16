import React, { useEffect, useMemo, useState } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { Button, Col, Container, Form, InputGroup, Row, Table } from 'react-bootstrap';
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
  const [ page, setPage ] = useState(1);
  const [ pageSize ] = useState(10);
  const [ totalPages, setTotalPages ] = useState(1);

  useEffect(() => {
    const fetchAssessments = async () => {
      const result = await AssessmentService.getList({ ...filters, page, pageSize });
      setAssessments(result.assessments || []);
      setTotalPages(result.totalPages || 1);
    };
    fetchAssessments();
  }, [ filters, page, pageSize ]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleDelete = async (id) => {
    await AssessmentService.delete(id);
    setAssessments(assessments.filter(a => a.id !== id));
  };

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
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>,
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
    <Container className="mt-4">
      {/* Global Search */}
      <Row className="mb-3">
        <Col md={4}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search all fields..."
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      {/* Filter Controls */}
      <Form className="mb-3">
        <Row className="g-2">
          <Col md>
            <Form.Control
              name="id"
              placeholder="Filter by ID"
              value={filters.id}
              onChange={handleChange}
            />
          </Col>
          <Col md>
            <Form.Control
              name="catName"
              placeholder="Filter by Cat Name"
              value={filters.catName}
              onChange={handleChange}
            />
          </Col>
          <Col md>
            <Form.Control
              name="catDateOfBirth"
              placeholder="Filter by Date of Birth"
              value={filters.catDateOfBirth}
              onChange={handleChange}
            />
          </Col>
          <Col md>
            <Form.Control
              name="instrumentType"
              placeholder="Filter by Instrument Type"
              value={filters.instrumentType}
              onChange={handleChange}
            />
          </Col>
          <Col md>
            <Form.Control
              name="score"
              placeholder="Filter by Score"
              value={filters.score}
              onChange={handleChange}
            />
          </Col>
          <Col md>
            <Form.Control
              name="riskLevel"
              placeholder="Filter by Risk Level"
              value={filters.riskLevel}
              onChange={handleChange}
            />
          </Col>
          <Col md>
            <Form.Control
              name="createdAt"
              placeholder="Filter by Created At"
              value={filters.createdAt}
              onChange={handleChange}
            />
          </Col>
        </Row>
      </Form>
      {Array.isArray(assessments) && assessments.length > 0 && headerGroups ?
        <Table {...getTableProps()} striped bordered hover responsive>
          <thead>
            {headerGroups.map(headerGroup =>
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column =>
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                    style={{ cursor: `pointer` }}
                  >
                    {column.render(`Header`)}
                    {column.isSorted ? column.isSortedDesc ? ` 🔽` : ` 🔼` : ``}
                  </th>)}
              </tr>)}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell =>
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render(`Cell`)}
                    </td>)}
                </tr>
              );
            })}
          </tbody>
        </Table> :
        <p className="text-muted">No assessments found.</p>}
      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center mt-3">
        <Button
          variant="secondary"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="me-2"
        >
          Previous
        </Button>
        <span>Page {page} of {totalPages}</span>
        <Button
          variant="secondary"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="ms-2"
        >
          Next
        </Button>
      </div>
    </Container>
  );
};
