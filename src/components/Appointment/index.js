import React from 'react';
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"
import Form from "components/Appointment/Form"
import useVisualMode from "../../hooks/useVisualMode.js" 
import Status from './Status.js';
import Confirm from 'components/Appointment/Confirm'
import Error from 'components/Appointment/Error'

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETE';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true));
  }
  const deleting = function() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true));
  };
  const confirmDelete = function() {
    transition(CONFIRM);
  }
  const edit = function() {
    transition(EDIT);
  }
  return ( 
    <article className="appointment">
      <Header />
      {props.time ? props.time : "No Appointments"}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={edit}
          />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message="Delete the appointment?" onCancel={back} onConfirm={deleting}/>}
      {mode === EDIT && <Form 
      interviewers={props.interviewers} 
      interviewer={props.interview.interviewer.id} 
      student={props.interview.student} 
      onCancel={back}
      onSave={save}
      />}
      {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={back}/>}
      {mode === ERROR_SAVE && <Error message="Could save appointment" onClose={back}/>}
    </article>
  );
}