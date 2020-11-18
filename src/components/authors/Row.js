import React from "react";
import { Link } from "react-router-dom";
import SwitchButton from "bootstrap-switch-button-react";

const Row = ({ author, setIsActive, onClick }) => {
  return (
    <tr>
      <td>{author.id}</td>
      <td>{author.name}</td>
      <td>
        <SwitchButton
          checked={author.is_active ? true : false}
          onlabel="Aktif"
          onstyle="info"
          offlabel="Pasif"
          offstyle="secondary"
          size="sm"
          onChange={setIsActive}
        />
      </td>
      <td>
        <button className="btn btn-sm btn-danger" onClick={onClick}>
          {" "}
          <i className="fa fa-trash"></i>
        </button>
      </td>
      <td>
        <Link
          to={`/authors/edit/${author.id}`}
          type="button"
          className="btn btn-warning btn-sm"
          data-tip="Düzenle"
        >
          <i className="fa fa-edit"></i>
        </Link>
      </td>
    </tr>
  );
};

export default Row;
