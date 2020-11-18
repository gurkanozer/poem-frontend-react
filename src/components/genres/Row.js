import React from "react";
import { Link } from "react-router-dom";
import SwitchButton from "bootstrap-switch-button-react";

const Row = ({ genre, setIsActive, onClick }) => {
  return (
    <tr>
      <td>{genre.id}</td>
      <td>{genre.title}</td>
      <td>
        <SwitchButton
          checked={genre.is_active ? true : false}
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
          to={`/genres/edit/${genre.id}`}
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
