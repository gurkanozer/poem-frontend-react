import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Form from "./Form";

import { getAuthors, updateAuthor } from "../../redux/actions/authorAction";
import { createMessage } from "../../redux/actions/alertAction";

const Edit = ({
  authors,
  selectedAuthor,
  updateAuthor,
  getAuthors,
  createMessage,
  history,
}) => {
  //USE STATE ---------------------------------
  const [author, setAuthor] = useState({ ...selectedAuthor });
  //USE EFFECT ---------------------------------
  useEffect(() => {
    if (authors.length <= 0) getAuthors();
    setAuthor((prev) => ({
      ...selectedAuthor,
    }));
  }, [selectedAuthor, authors, getAuthors]);
  // METHODLAR ------------------------------
  //CANCEL -------------------------------
  const cancel = (e) => {
    setAuthor({});
    e.preventDefault();
    redirect();
  };
  //REDIRECT ----------------------------------
  const redirect = () => {
    history.push("/authors");
  };
  //ON CHANGE EVENT ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //EDIT START -----------------------------
  function handleEdit(e) {
    let isAuthorExist = false;
    authors.map((a) => {
      if (a.name === author.name && isAuthorExist === false) {
        isAuthorExist = true;
      }
      return true;
    });
    if (author.name === selectedAuthor.name) redirect();
    else if (isAuthorExist === true) {
      createMessage({ text: "Bu kayıt mevcut!" });
    } else {
      updateAuthor(author);
      redirect();
    }
    e.preventDefault();
  }
  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <form method="post">
        <Form
          author={author}
          formTitle="Kaydı Düznele"
          onChange={handleChange}
          onSubmit={handleEdit}
          cancel={cancel}
        />
      </form>
    </div>
  );
};
function getAuthorById(authors, authorId) {
  // eslint-disable-next-line eqeqeq
  let author = authors.find((p) => p.id == authorId) || null;
  return author;
}
function mapStateToProps(state, ownProps) {
  const authorId = ownProps.match.params.id;
  const selectedAuthor =
    authorId && state.authors.length > 0
      ? getAuthorById(state.authors, authorId)
      : {};
  return {
    authors: state.authors,
    selectedAuthor,
  };
}
const mapDispatchToProps = {
  getAuthors,
  createMessage,
  updateAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
