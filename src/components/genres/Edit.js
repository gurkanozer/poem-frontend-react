import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Form from "./Form";

import { getGenres, updateGenre } from "../../redux/actions/genreAction";
import { createMessage } from "../../redux/actions/alertAction";

const Edit = ({
  genres,
  selectedGenre,
  updateGenre,
  getGenres,
  createMessage,
  history,
}) => {
  //USE STATE ---------------------------------
  const [genre, setGenre] = useState({ ...selectedGenre });
  //USE EFFECT ---------------------------------
  useEffect(() => {
    if (genres.length <= 0) getGenres();
    setGenre((prev) => ({
      ...selectedGenre,
    }));
  }, [selectedGenre, genres, getGenres]);
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
    setGenre((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //EDIT START -----------------------------
  function handleEdit(e) {
    let isGenreExist = false;
    genres.map((g) => {
      if (g.title === genre.title && isGenreExist === false) {
        isGenreExist = true;
      }
      return true;
    });
    if (genre.title === selectedGenre.title) redirect();
    else if (isGenreExist === true) {
      createMessage({ text: "Bu kayıt mevcut!" });
    } else {
      updateGenre(genre);
      redirect();
    }
    e.preventDefault();
  }
  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <form method="post">
        <Form
          genre={genre}
          formTitle="Kaydı Düznele"
          onChange={handleChange}
          onSubmit={handleEdit}
          cancel={cancel}
        />
      </form>
    </div>
  );
};
function getGenreById(genres, genreId) {
  // eslint-disable-next-line eqeqeq
  let genre = genres.find((g) => g.id == genreId) || null;
  return genre;
}
function mapStateToProps(state, ownProps) {
  const genreId = ownProps.match.params.id;
  const selectedGenre =
    genreId && state.genres.length > 0
      ? getGenreById(state.genres, genreId)
      : {};
  return {
    genres: state.genres,
    selectedGenre,
  };
}
const mapDispatchToProps = {
  getGenres,
  createMessage,
  updateGenre,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
