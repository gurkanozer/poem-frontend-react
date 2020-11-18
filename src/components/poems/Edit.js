import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getPoems, updatePoem } from "../../redux/actions/poemAction";
import { getAuthors } from "../../redux/actions/authorAction";
import { getGenres } from "../../redux/actions/genreAction";
import { showMessage } from "../../redux/actions/alertAction";

import Form from "./form/Form";
const Edit = ({
  selectedPoem,
  authors,
  getAuthors,
  genres,
  getGenres,
  showMessage,
  poems,
  getPoems,
  updatePoem,
  history,
  ...props
}) => {
  //USE STATE
  const [poem, setPoem] = useState({ ...selectedPoem });

  //USE EFFECT
  useEffect(() => {
    if (poems.length <= 0) getPoems();
    if (authors.length <= 0) getAuthors();
    if (genres.length <= 0) getGenres();
    setPoem((prevPoem) => ({
      ...selectedPoem,
    }));
  }, [selectedPoem, poems, getPoems, authors, getAuthors, genres, getGenres]);

  // METHODLAR
  //CANCEL
  const cancel = (e) => {
    setPoem({});
    e.preventDefault();
    redirect();
  };
  //REDIRECT
  const redirect = () => {
    history.push("/poems");
  };
  //ON CHANGE EVENT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoem((prevPoem) => ({
      ...prevPoem,
      [name]: value,
    }));
  };
  //SELECT ON CHANGE EVENT
  const selectHandler = (e) => {
    const { name, value } = e.target;
    setPoem((prevPoem) => ({
      ...prevPoem,
      [name]: parseInt(value),
    }));
    //Form üzerindeki button'u disable-enable yapmak için select verisinin int olması gerek.
    //Çünkü select üzerindeki default değer string. bu sayede eğer select değeri string ise button disable kalacak.
  };
  //EDIT START
  function handleEdit(e) {
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
        poem.author_id !== selectedPoem.author_id &&
        p.author_id === poem.author_id
      )
        isPoemExist = true;
      else if (
        p.title.trim() === poem.title.trim() &&
        poem.author_id === selectedPoem.author_id
      )
        isPoemExist = false;
      return true;
    });
    if (isAuthorExist === true && isPoemExist === true) {
      console.log("olmadı");
      showMessage({ text: "Bu kayıt mevcut!" });
    } else {
      let updatedPoem = {
        id: poem.id,
        title: poem.title,
        content: poem.content,
        author_id: poem.author_id,
      };
      updatePoem(updatedPoem);
      redirect();
    }
    e.preventDefault();
  }
  //EDIT END
  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <Form
        poem={poem}
        authors={authors}
        poems={poems}
        genres={genres}
        formTitle="Düzenle"
        cancel={cancel}
        onChange={handleChange}
        selectHandler={selectHandler}
        onSubmit={handleEdit}
      />
    </div>
  );
};
//Sayfa yenilenirse şiir bilgisini tekrar çekmek için
function getPoemById(poems, poemId) {
  // eslint-disable-next-line eqeqeq
  let poem = poems.find((p) => p.id == poemId) || null;
  return poem;
}
function mapStateToProps(state, ownProps) {
  const poemId = ownProps.match.params.id;
  const selectedPoem =
    poemId && state.poems.length > 0 ? getPoemById(state.poems, poemId) : {};

  return {
    poems: state.poems,
    authors: state.authors,
    genres: state.genres,
    selectedPoem,
    poemId,
  };
}

const mapDispatchToProps = {
  getPoems,
  getAuthors,
  getGenres,
  updatePoem,
  showMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
