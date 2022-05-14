import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import config from "../../config.json";

import "./Styles.css";

const AcceptedResearchTopic = (props) => (
  <tr>
    <td>{props.record.field}</td>
    <td>{props.record.topic}</td>
    <td>{props.record.message}</td>
    <td>{props.record.groupid}</td>
    <td>
      <Link
        type="button"
        className="btn btn-primary"
        to={`/chat/${props.user}/${props.record.groupid}`}
        target="_blank"
      >
        {" "}
        Chat
      </Link>{" "}
      |{" "}
      <Link
        type="button"
        className="btn btn-primary"
        to={`/markings/${props.record.groupid}`}
        target="_blank"
      >
        {" "}
        Submissions and Markings
      </Link>
    </td>
  </tr>
);

export default function AcceptedStaffResearchTopics() {
  const params = useParams();

  const [acceptedResearchTopics, setAcceptedResearchTopics] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `${config.API}/staff/topics/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setAcceptedResearchTopics(records);
    }

    getRecords();
  }, [acceptedResearchTopics.length]);

  function acceptedResearchTopicsList() {
    if (acceptedResearchTopics.length === 0) {
      return (
        <div>
          <h6>Currenly, you do not have accepted research topics</h6>
        </div>
      );
    }
    return acceptedResearchTopics.map((record) => {
      return (
        <AcceptedResearchTopic
          record={record}
          user={params.id.toString()}
          key={record._id}
        />
      );
    });
  }

  return (
    <div className="body">
      <h5>Research Accepted Topics</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Field</th>
            <th>Topic</th>
            <th>Message</th>
            <th>Group ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{acceptedResearchTopicsList()}</tbody>
      </table>
    </div>
  );
}
