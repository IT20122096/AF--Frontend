import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CriteriaList from "./CriteriaList";
import Submissions from "./Submissions";
import { getMarkingRubricks } from "../../../services/IT20216078/staffServices";

import "./Styles.css";

const MarkingRubric = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>
      <CriteriaList id={props.record._id} />
    </td>
    <td>
      <Link
        className="btn btn-primary"
        to={`/insertmark/${props.record.name}/${props.groupid}`}
      >
        Submit Mark
      </Link>{" "}
    </td>
  </tr>
);

export default function Markings() {
  const params = useParams();

  const [markingRubrics, setMarkingRubrics] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = (await getMarkingRubricks(params.id.toString())).data;

      setMarkingRubrics(response);
    }

    getRecords();
  }, [markingRubrics.length]);

  function markingRubricList() {
    if (markingRubrics.length === 0) {
      return (
        <tr>
          <td>Marking rubricks not found. Please contact administrator</td>
        </tr>
      );
    }
    return markingRubrics.map((record) => {
      return (
        <MarkingRubric
          record={record}
          groupid={params.id.toString()}
          key={record._id}
        />
      );
    });
  }

  return (
    <div className="body">
      <h3>Submissions</h3>
      <Submissions id={params.id.toString()} />
      <h3>Marking Rubricks and Criterias</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Marking Rubrick</th>
            <th>Marking Criteria</th>
          </tr>
        </thead>
        <tbody>{markingRubricList()}</tbody>
      </table>
    </div>
  );
}
