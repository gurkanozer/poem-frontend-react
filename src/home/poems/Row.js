import React from "react";
import { Link } from "react-router-dom";

const Row = ({ poem, ...props }) => {
  return (
    <div className="card bg-white p-0 m-2" style={{ width: 240 + "px" }}>
      <div className="card-header p-0">
        <Link
          to={`/detail/${poem.id}`}
          className="list-group-item list-group-item-action list-group-item-default"
        >
          {poem.title}
        </Link>
      </div>
      <div className="card-body">
        <p className="card-text">
          {poem.content.length > 120 && poem.content.substring(0, 120) + "..."}
        </p>
        <hr />
        {poem.author.name}
      </div>
    </div>
  );
};

export default Row;
