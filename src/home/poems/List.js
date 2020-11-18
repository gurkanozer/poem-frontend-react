import React from "react";

import Footer from "../Footer";
import Row from "./Row";

const List = ({ poems, message, resetSearch, ...props }) => {
  return (
    <div className="col-md-9 m-0">
      {message.keyword.length > 0 && (
        <div className="row alert alert-info m-0 ">
          Aranan kelime: {message.keyword}{" "}
        </div>
      )}
      {poems.length <= 0 ? (
        <div className="row alert alert-danger m-0 mt-2">
          Herhangi bir kayıt bulunamadı!
        </div>
      ) : (
        <div className="row">
          {poems.map(
            (poem) =>
              poem.author.is_active === 1 &&
              poem.is_active === 1 && <Row key={poem.id} poem={poem} />
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default List;
