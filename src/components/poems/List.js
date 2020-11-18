import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import alertify from "alertifyjs";
import Search from "../layouts/Search";
import "alertifyjs/build/css/alertify.css";
import {
  getPoems,
  deletePoem,
  updatePoem,
} from "../../redux/actions/poemAction";
import Row from "./Row";

const List = ({ poems, getPoems, updatePoem, deletePoem, ...props }) => {
  //STATES
  const [poem, setPoem] = useState({});
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState([]);
  //USE EFFECT
  useEffect(() => {
    if (poems.length <= 0 && counter < 1) {
      getPoems();
      setCounter((prev) => prev + 1);
    }
    //is active işleminin yapılması
    if (poem.id) {
      updatePoem(poem);
      setPoem({});
    }
    setList([...poems]);
  }, [counter, poem, poems, getPoems, updatePoem]);
  // SEARCH
  const handleSearch = (event) => {
    setList(
      poems.filter(
        (poem) =>
          poem.title
            .trim()
            .toLowerCase()
            .indexOf(keyword.trim().toLowerCase()) > -1
      )
    );
  };
  //SET IS ACTIVE
  const setIsActive = (data) => {
    data.is_active = data.is_active === 0 ? 1 : 0;
    setPoem({ ...data });
  };
  //DELETE
  function handleDelete(data) {
    alertify
      .confirm(
        "Kaydı Sil",
        "Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?",
        function () {
          deletePoem(data);
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
        link="/poems/add"
        placeholder="Şiirlerde ara..."
        onClick={handleSearch}
        onChange={handleChange}
      />
      {list.length <= 0 ? (
        <div className="alert alert-danger text-center">
          Herhangi bir kayıt bulunmamaktadır!
        </div>
      ) : (
        <table className="table table-striped table-hover border bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Başlık</th>
              <th>Yazar</th>
              <th>Durumu</th>
              <th>Sil</th>
              <th>Düzenle</th>
            </tr>
          </thead>
          <tbody>
            {list.map((poem) => (
              <Row
                key={poem.id}
                poem={poem}
                setIsActive={() => setIsActive(poem)}
                onClick={() => handleDelete(poem.id)}
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
    poems: state.poems,
  };
}
const mapDispatchToProps = { getPoems, deletePoem, updatePoem };

export default connect(mapStateToProps, mapDispatchToProps)(List);
