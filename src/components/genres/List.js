import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import alertify from "alertifyjs";
import Search from "../layouts/Search";
import "alertifyjs/build/css/alertify.css";
import {
  deleteGenre,
  getGenres,
  updateGenre,
} from "../../redux/actions/genreAction";
import Row from "./Row";
const List = ({ genres, updateGenre, deleteGenre, getGenres, ...props }) => {
  const [genre, setGenre] = useState({});
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (genres.length <= 0 && counter < 1) {
      getGenres();
      setCounter((prev) => prev + 1);
    }
    if (genre.id) {
      updateGenre(genre);
      setGenre({});
    }
    setList([...genres]);
  }, [counter, genre, updateGenre, genres, getGenres]);
  // SEARCH
  const handleSearch = (event) => {
    setList(
      genres.filter(
        (genre) =>
          genre.title
            .trim()
            .toLowerCase()
            .indexOf(keyword.trim().toLowerCase()) > -1
      )
    );
  };
  // SET GENRE'S IS ACTIVE
  const setIsActive = (data) => {
    data.is_active = data.is_active === 0 ? 1 : 0;
    setGenre({ id: data.id, is_active: data.is_active });
  };
  //DELETE GENRE
  function handleDelete(data) {
    alertify
      .confirm(
        "Kaydı Sil",
        "Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?",
        function () {
          deleteGenre(data);
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
        link="/genres/add"
        placeholder="Kategorilerde ara..."
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
            {list.map((genre) => (
              <Row
                key={genre.id}
                genre={genre}
                setIsActive={() => setIsActive(genre)}
                onClick={() => handleDelete(genre.id)}
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
    genres: state.genres,
  };
}
const mapDispatchToProps = { getGenres, deleteGenre, updateGenre };

export default connect(mapStateToProps, mapDispatchToProps)(List);
