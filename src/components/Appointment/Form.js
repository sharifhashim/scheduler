import React, { useState } from 'react';
import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }
  const cancel = () => {
    reset()
    props.onCancel()
  }
  const save = () => {
    props.onSave(student, interviewer)

  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            //onSave={props.onSave}
        /*
          This must be a controlled component
          your code goes here
        */
          />
        </form>
        <InterviewerList 
        interviewers={props.interviewers}
        onChange={setInterviewer}
        value={interviewer}
        onSave={props.onSave}
      /* your code goes here */
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger  onClick={cancel}>Cancel</Button> {/* your code goes here */}
          <Button confirm onClick={save}>Save</Button> {/* your code goes here */}
        </section>
      </section>
    </main>
  );
}