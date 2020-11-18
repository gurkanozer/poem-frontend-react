import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Form from "./Form";

import { getAuthors, addAuthor } from "../../redux/actions/authorAction";
import { createMessage } from "../../redux/actions/alertAction";
import PropTypes from "prop-types";

const Add = ({ authors, addAuthor, getAuthors, createMessage, history }) => {
  //USE STATE ---------------------------------
  const [author, setAuthor] = useState({});
  //USE EFFECT ---------------------------------
  useEffect(() => {
    if (authors.length <= 0) getAuthors();
  }, [authors, getAuthors]);
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
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };
  //ADD START -----------------------------
  function handleAdd(e) {
    let isAuthorExist = false;
    authors.map((a) => {
      if (a.name === author.name && isAuthorExist === false) {
        isAuthorExist = true;
      }
      return true;
    });
    if (isAuthorExist === true) {
      createMessage({ text: "Bu kayıt mevcut!" });
    } else {
      // console.log(author);
      addAuthor(author);
      redirect();
    }
    e.preventDefault();
  }
  return (
    <div className="col-md-10 offset-md-1 mt-4">
      <form method="post">
        <Form
          author={author}
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
    authors: state.authors,
  };
}
const mapDispatchToProps = {
  getAuthors,
  createMessage,
  addAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

Add.propTypes = {
  authors: PropTypes.array,
  getAuthors: PropTypes.func.isRequired,
  addAuthor: PropTypes.func.isRequired,
  createMessage: PropTypes.func,
};
