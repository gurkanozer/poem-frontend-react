import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import alertify from "alertifyjs";
import Search from "../layouts/Search";
import "alertifyjs/build/css/alertify.css";
import {
  deleteAuthor,
  getAuthors,
  updateAuthor,
} from "../../redux/actions/authorAction";
import Row from "./Row";
const List = ({
  authors,
  updateAuthor,
  deleteAuthor,
  getAuthors,
  ...props
}) => {
  const [author, setAuthor] = useState({});
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (authors.length <= 0 && counter < 1) {
      getAuthors();
      setCounter((prev) => prev + 1);
    }
    if (author.id) {
      updateAuthor(author);
      setAuthor({});
    }
    setList([...authors]);
  }, [counter, author, updateAuthor, authors, getAuthors]);
  // SEARCH
  const handleSearch = (event) => {
    setList(
      authors.filter(
        (author) =>
          author.name
            .trim()
            .toLowerCase()
            .indexOf(keyword.trim().toLowerCase()) > -1
      )
    );
  };
  // SET AUTHOR'S IS ACTIVE
  const setIsActive = (data) => {
    data.is_active = data.is_active === 0 ? 1 : 0;
    setAuthor({ id: data.id, is_active: data.is_active });
  };
  //DELETE AUTHOR
  function handleDelete(data) {
    alertify
      .confirm(
        "Kaydı Sil",
        "Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?",
        function () {
          deleteAuthor(data);
        },
        function () {}
      )
      .set("labels", { ok: "Evet", cancel: "İptal" });
  }
  //ON CHANGE EVENT ------------------------
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="col-md-10 offset-md-1">
      <Search
        value={keyword}
        link="/authors/add"
        placeholder="Şairlerde ara..."
        onClick={handleSearch}
        onChange={handleChange}
      />
      {list.length <= 0 ? (
        <div className="alert alert-danger text-center">
          Herhangi bir kayıt bulunmamamktadır!
        </div>
      ) : (
        <table className="table table-striped table-hover border bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Adı</th>
              <th>Durumu</th>
              <th>Sil</th>
              <th>Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {list.map((author) => (
              <Row
                key={author.id}
                author={author}
                setIsActive={() => setIsActive(author)}
                onClick={() => handleDelete(author.id)}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
  };
}
const mapDispatchToProps = { getAuthors, deleteAuthor, updateAuthor };

export default connect(mapStateToProps, mapDispatchToProps)(List);
