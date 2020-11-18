import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPoems } from "../../redux/actions/poemAction";
import { getAuthors } from "../../redux/actions/authorAction";

const Dashboard = ({ authors, getAuthors, poems, getPoems, ...props }) => {
  useEffect(() => {
    if (poems.length <= 0) getPoems();
    if (authors.length <= 0) getAuthors();
  }, [poems, getPoems, authors, getAuthors]);

  return (
    <div className="container row">
      <div className="col-md-9">
        <div className="row">Yazarlar</div>
        <div className="row">Şiirler</div>
      </div>
      <div className="col-md-3">İstatistikler</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    poems: state.poems,
    authors: state.authors,
  };
}

const mapDispatchToProps = { getPoems, getAuthors };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
