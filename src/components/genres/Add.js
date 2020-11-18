import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Form from "./Form";

import { getGenres, addGenre } from "../../redux/actions/genreAction";
import { createMessage } from "../../redux/actions/alertAction";
import PropTypes from "prop-types";

const Add = ({ genres, addGenre, getGenres, createMessage, history }) => {
  //USE STATE ---------------------------------
  const [genre, setGenre] = useState({});
  //USE EFFECT ---------------------------------
  useEffect(() => {
    if (genres.length <= 0) getGenres();
  }, [genres, getGenres]);
  // METHODLAR ------------------------------
  //CANCEL -------------------------------
  const cancel = (e) => {
    setGenre({});
    e.preventDefault();
    redirect();
  };
  //REDIRECT ----------------------------------
  const redirect = () => {
    history.push("/genres");
  };
  //ON CHANGE EVENT ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenre((prevGenre) => ({
      ...prevGenre,
      [name]: value,
    }));
  };
  //ADD START -----------------------------
  function handleAdd(e) {
    let isGenreExist = false;
    genres.map((a) => {
      if (a.title === genre.name && isGenreExist === false) {
        isGenreExist = true;
      }
      return true;
    });
    if (isGenreExist === true) {
      createMessage({ text: "Bu kayıt mevcut!" });
    } else {
      addGenre(genre);
      redirect();
    }
    e.preventDefault();
  }
  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <form method="post">
        <Form
          genre={genre}
          formTitle="Yeni Kayıt Ekle"
          onChange={handleChange}
          onSubmit={handleAdd}
          cancel={cancel}
        />
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    genres: state.genres,
  };
}
const mapDispatchToProps = {
  getGenres,
  createMessage,
  addGenre,
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

Add.propTypes = {
  genres: PropTypes.array,
  getGenres: PropTypes.func.isRequired,
  addGenre: PropTypes.func.isRequired,
  createMessage: PropTypes.func,
};
