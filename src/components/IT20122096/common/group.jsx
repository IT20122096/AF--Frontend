import React from "react";

import Button from "@mui/material/Button";

const Group = ({items}) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          {items.map((item) => (
            <div key={item._id} className="col 1">
              <div className="card" style={{ width: "18rem" }}>
                <h5
                  className="card-header"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {item.groupid}
                </h5>
                <div className="card-body">
                  <p className="card-text">
                    Supervisor :{" "}
                    {(item.supercisorid && "Available") || "Unavailabel"}
                  </p>
                  <p className="card-text">
                    Co-Supervisor :{" "}
                    {(item.cosupercisorid && "Available") || "Unavailabel"}
                  </p>
                  <p className="card-text">
                    Pannel Member :{" "}
                    {(item.panelmember && "Assigned") || "Unassigned"}
                  </p>

                  <Button
                    href={`/researchgroup/${item._id}`}
                    variant="contained"
                    style={{ width: "16rem", marginTop: "1rem" }}
                    className="btn btn-primary"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;
