import React, { useEffect } from "react";
//import { useParams } from "react-router-dom";
import { getPoems } from "../../redux/actions/poemAction";
import { connect } from "react-redux";
import Footer from "../Footer";

const Detail = ({ poem, poems, ...props }) => {
  //let { id } = useParams();
  //USE EFFECT

  useEffect(() => {
    if (poems.length <= 0) getPoems();
  }, [poems, poem]);

  function setRows(text) {
    return text.split("\n").map(function (item, key) {
      return (
        <p key={key}>
          {item}
          <br />
        </p>
      );
    });
  }

  return (
    <div className="col-md-9 m-0">
      {typeof poem !== "undefined" || poem !== null ? (
        <div className="card bg-white p-0 m-2">
          <div className="card-header bg-white">{poem.title}</div>
          <div className="card-body">
            {setRows(poem.content)}
            <hr />
            {poem.author.name}
          </div>
        </div>
      ) : (
        <div className="alert alert-danger">Herhangi bir kayıt bulunamadı!</div>
      )}
      <Footer />
    </div>
  );
};
function getPoemById(poems, poemId) {
  // eslint-disable-next-line eqeqeq
  let poem = poems.find((p) => p.id == poemId) || null;
  return poem;
}
function mapStateToProps(state, ownProps) {
  const poemId = ownProps.match.params.id;
  const poem =
    poemId && state.poems.length > 0 ? getPoemById(state.poems, poemId) : {};

  return {
    poems: state.poems,
    poem,
  };
}

export default connect(mapStateToProps)(Detail);
