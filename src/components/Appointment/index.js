import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import useVisualMode from "../../hooks/useVisualMode.js" 
import Status from './Status.js';
import Confirm from 'components/Appointment/Confirm'

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETE';
  const CONFIRM = 'CONFIRM';

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => console.log(err))
  }
  const deleting = function() {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => console.log(err))
  };
  const confirmDelete = function() {
    transition(CONFIRM);
  }
  return ( 
    <article className="appointment">
      {props.time ? props.time : "No Appointments"}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message="Delete the appointment?" onCancel={back} onConfirm={deleting}/>}
    </article>
  );
}