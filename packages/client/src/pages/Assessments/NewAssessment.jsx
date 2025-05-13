// import { text } from 'stream/consumers';
import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => await console.log(data);
  //  {
  // await AssessmentService.submit(data);
  //  };
  const { handleSubmit, register } = useForm();
  return (
    <Form onSubmit={ handleSubmit(onSubmit) } className="p-4 border rounded bg-light">
      <h1 className="mb-4">Cat Assessment Info</h1>
      <section className="mb-4">
        <h4>Instrument</h4>
        <p>Cat Behavioral Instrument</p>
      </section>
      <section className="mb-4">
        <h4>Cat Details</h4>
        <Form.Group className="mb-3">
          <Form.Label>Cat Name</Form.Label>
          <Form.Control type="text" {...register(`CatName`, { required: true })} placeholder="Enter cat name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cat Date of Birth</Form.Label>
          <Form.Control type="date" {...register(`CatDateOfBirth`)} />
        </Form.Group>
      </section>
      <section className="mb-4">
        <h4>Questions & Responses</h4>
        <ol>
          <li className="mb-3">
            <Form.Label>Previous contact with the Cat Judicial System</Form.Label>
            <div>
              <Form.Check
                inline
                label="No"
                type="radio"
                value="0"
                {...register(`PreContact`)}
              />
              <Form.Check
                inline
                label="Yes"
                type="radio"
                value="1"
                {...register(`PreContact`)}
              />
            </div>
          </li>

          <li className="mb-3">
            <Form.Label>Physical altercations with other cats</Form.Label>
            <div>
              <Form.Check
                inline
                label="0-3 altercations"
                type="radio"
                value="0"
                {...register(`PhysAltCat`)}
              />
              <Form.Check
                inline
                label="3+ altercations"
                type="radio"
                value="1"
                {...register(`PhysAltCat`)}
              />
            </div>
          </li>

          <li className="mb-3">
            <Form.Label>Physical altercations with owner (scratching, biting, etc...)</Form.Label>
            <div>
              <Form.Check
                inline
                label="0-10 altercations"
                type="radio"
                value="0"
                {...register(`PhysAltOwner`)}
              />
              <Form.Check
                inline
                label="10+ altercations"
                type="radio"
                value="1"
                {...register(`PhysAltOwner`)}
              />
            </div>
          </li>

          <li className="mb-3">
            <Form.Label>Plays well with dogs</Form.Label>
            <div>
              <Form.Check
                inline
                label="No"
                type="radio"
                value="0"
                {...register(`PlaysDogs`)}
              />
              <Form.Check
                inline
                label="Yes"
                type="radio"
                value="1"
                {...register(`PlaysDogs`)}
              />
            </div>
          </li>

          <li className="mb-3">
            <Form.Label>Hisses at strangers</Form.Label>
            <div>
              <Form.Check
                inline
                label="No"
                type="radio"
                value="0"
                {...register(`HissesStr`)}
              />
              <Form.Check
                inline
                label="Yes"
                type="radio"
                value="1"
                {...register(`HissesStr`)}
              />
            </div>
          </li>
        </ol>
      </section>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>);
};
