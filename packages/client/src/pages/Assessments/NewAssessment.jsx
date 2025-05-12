import { text } from 'stream/consumers';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };
  const { register } = useForm();
  return (
    <Form>
      <h1>Cat Assessment Info</h1>
      <div>
        <h2>Instrument</h2>
        <p>Cat Behavioral Instrument</p>
      </div>
      <div>
        <h2>Cat Details</h2>
        <label>
          Cat Name
          <input type="text" {...register(`CatName`, { required: true })} />
        </label>
        <label>
          Cat Date of Birth
          <input type="date" {...register(`CatDateOfBirth`)} />
        </label>
      </div>
      <div>
        <h2>Questions & Responses</h2>
        <ol>
          <li>Previous contact with the Cat Judicial System</li>
          <label>
            <input type="radio" value="0" {...register(`PreContact`)} />
            No
          </label>
          <label>
            <input type="radio" value="1" {...register(`PreContact`)} />
            Yes
          </label>
          <li>Physical altercations with other cates</li>
          <label>
            <input type="radio" value="0" {...register(`PhysAltCat`)} />
            0-3 altercations
          </label>
          <label>
            <input type="radio" value="1" {...register(`PhysAltCat`)} />
            3+ altercations
          </label>
          <li>Physical altercations with owner (scratching, biting, etc...)</li>
          <label>
            <input type="radio" value="0" {...register(`PhysAltOwner`)} />
            0-10 altercations
          </label>
          <label>
            <input type="radio" value="1" {...register(`PhysAltOwner`)} />
            10+ altercations
          </label>
          <li>Plays well with dogs</li>
          <label>
            <input type="radio" value="0" {...register(`PlaysDogs`)} />
            No
          </label>
          <label>
            <input type="radio" value="1" {...register(`PlaysDogs`)} />
            Yes
          </label>
          <li>Hisses at strangers</li>
          <label>
            <input type="radio" value="0" {...register(`HissesStr`)} />
            No
          </label>
          <label>
            <input type="radio" value="1" {...register(`HissesStr`)} />
            Yes
          </label>
        </ol>
      </div>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>);
};
