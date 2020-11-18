import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Form from "./form/Form";

import { addPoem, getPoems } from "../../redux/actions/poemAction";
import { getAuthors } from "../../redux/actions/authorAction";
import { getGenres } from "../../redux/actions/genreAction";
import { createMessage } from "../../redux/actions/alertAction";

const Add = ({
  poems,
  authors,
  genres,
  getAuthors,
  getGenres,
  createMessage,
  getPoems,
  history,
  addPoem,
  ...props
}) => {
  //USE STATE ---------------------------------
  const [poem, setPoem] = useState({});

  //USE EFFECT ---------------------------------
  useEffect(() => {
    //authors state'ini sayfa yüklenirken çekmek için
    if (authors.length <= 0) getAuthors();
    if (poems.length <= 0) getPoems();
    if (genres.length <= 0) getGenres();
  }, [poems, getPoems, authors, getAuthors, genres, getGenres]);
  // METHODLAR ------------------------------
  //CANCEL -------------------------------
  const cancel = (e) => {
    setPoem({});
    e.preventDefault();
    redirect();
  };
  //REDIRECT ----------------------------------
  const redirect = () => {
    history.push("/poems");
  };
  //ON CHANGE EVENT ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoem((prevPoem) => ({
      ...prevPoem,
      [name]: value,
    }));
  };
  //SELECT ON CHANGE EVENT ---------------------
  const selectHandler = (e) => {
    const { name, value } = e.target;
    setPoem((prevPoem) => ({
      ...prevPoem,
      [name]: parseInt(value),
    }));
  };
  //ADD START ------------------
  function handleAdd(e) {
    let isAuthorExist = false;
    let isPoemExist = false;
    authors.map((a) => {
      if (a.id === poem.author_id && isAuthorExist === false) {
        isAuthorExist = true;
      }
      return true;
    });
    poems.map((p) => {
      if (
        p.title.trim() === poem.title.trim() &&
        isPoemExist === false &&
        p.author_id === poem.author_id
      )
        isPoemExist = true;
      return true;
    });
    if (isAuthorExist === true && isPoemExist === true) {
      createMessage({ text: "Bu kayıt mevcut!" });
    } else {
      addPoem(poem);
      redirect();
    }
    e.preventDefault();
  }
  //ADD END ---------------------
  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <form method="post">
        <Form
          poem={poem}
          authors={authors}
          genres={genres}
          formTitle="Yeni Kayıt Ekle"
          cancel={cancel}
          onChange={handleChange}
          selectHandler={selectHandler}
          onSubmit={handleAdd}
        />
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    poems: state.poems,
    authors: state.authors,
    genres: state.genres,
  };
}

const mapDispatchToProps = {
  getPoems,
  addPoem,
  getGenres,
  getAuthors,
  createMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
