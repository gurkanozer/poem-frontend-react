import React, { useEffect, useState } from "react";
//TOOLBOX
import TextInput from "../components/toolbox/TextInput";
import SelectInput from "../components/toolbox/SelectInput";
const Sidebar = ({
  authors,
  poems,
  genres,
  keyword,
  selectedAuthor,
  onClick,
  onChange,
  onChangeFilters,
}) => {
  const [poemOptions, setPoemOptions] = useState([]);

  useEffect(() => {
    if (parseInt(selectedAuthor, 10))
      // eslint-disable-next-line eqeqeq
      setPoemOptions(poems.filter((poem) => poem.author_id == selectedAuthor));
    else setPoemOptions(poems);
  }, [selectedAuthor, poems]);

  return (
    <div className="col-md-3 border-right ">
      <TextInput
        name="keyword"
        type="text"
        label="Ara:"
        placeHolder="Bir şeyler yaz..."
        value={keyword || ""}
        onChange={onChange}
      />
      <button className="btn btn-block btn-primary" onClick={onClick}>
        <i className="fa fa-search"></i> Ara
      </button>
      <hr />
      <SelectInput
        name="author_id"
        label="Yazar:"
        options={authors}
        optionKey="name"
        onChange={onChangeFilters}
      />
      <SelectInput
        name="id"
        label="Şiir:"
        options={poemOptions}
        optionKey="title"
        onChange={onChangeFilters}
      />
      <SelectInput
        name="genre_id"
        label="Tür:"
        options={genres}
        optionKey="title"
        onChange={onChangeFilters}
      />
    </div>
  );
};
export default Sidebar;
