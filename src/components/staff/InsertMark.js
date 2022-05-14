import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";

import config from "../../config.json";

import "./Styles.css";

export default function InsertMark() {
  const params = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: params.id0.toString(),
    mark: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const mark = { ...form };

    const response = await fetch(
      `${config.API}/staff/insertmarks/${params.id1.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mark),
      }
    ).catch((error) => {
      window.alert(error);
      return;
    });

    if (response.status === 406) {
      window.alert("Cannot change submitted marks again");
    }

    navigate(-1);
  }

  return (
    <div className="body">
      <h3>Enter Marks</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            disabled={true}
            type="text"
            className="form-control"
            id="name"
            placeholder="Please enter the name of the marking rubrick here"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="mark"
            placeholder="Please enter the mark (Cannot change later!)"
            value={form.mark}
            onChange={(e) => updateForm({ mark: e.target.value })}
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Submit Mark"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
