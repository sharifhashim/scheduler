import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList(props) {
  const listInterviewer = props.interviewers.map((interviewer) => <InterviewerListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} selected={value === interviewer.id} setInterviewer={() => onChange(interviewer.id)}/> )
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {listInterviewer}
      </ul>
    </section>
  );
}