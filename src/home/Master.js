import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
//Components
import Sidebar from "./Sidebar";
import List from "./poems/List";
import Detail from "./poems/Detail";
//ACTIONS
import { getAuthors } from "../redux/actions/authorAction";
import { getPoems } from "../redux/actions/poemAction";
import { getGenres } from "../redux/actions/genreAction";

const Master = ({
  poems,
  genres,
  authors,
  getAuthors,
  getPoems,
  getGenres,
  history,
}) => {
  //STATES ----------------------------------
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({
    id: NaN,
    author_id: NaN,
    genre_id: NaN,
  });
  const [message, setMessage] = useState({ keyword: "", state: false });
  const [list, setList] = useState([]);

  //USE EFFECT ------------------------------
  useEffect(() => {
    if (authors.length <= 0) getAuthors();
    if (poems.length <= 0) getPoems();
    if (genres.length <= 0) getGenres();
    setList([...poems]);
  }, [authors, poems, genres, getAuthors, getPoems, getGenres]);

  useEffect(() => {
    if (message.state === true) {
      setMessage((prev) => ({
        keyword: keyword,
        state: false,
      }));
    }
  }, [keyword, message]);
  //yazar bilgisinin değişmesi halinde şiir bilgisinide sil
  useEffect(() => {
    //NaN olması halinde değeri değişmeyecek
    if (!isNaN(filters.author_id))
      setFilters((prev) => ({
        ...prev,
        id: NaN,
      }));
  }, [filters.author_id]);
  //REDIRECT ----------------------------------
  const redirect = () => {
    history.push("/");
  };
  //SEARCH START ---------------------------------
  const handleSearch = (event) => {
    event.preventDefault();
    let limitedList = multiFilter(poems, filters);
    console.log("Limitied List: ", limitedList);
    setList(
      limitedList.filter(
        (poem) =>
          poem.content
            .trim()
            .toLowerCase()
            .indexOf(keyword.trim().toLowerCase()) > -1
      )
    );
    setMessage((prev) => ({ ...prev, state: true }));
    redirect();
  };
  //Filters --------------------------------------
  const multiFilter = (arr, filters) => {
    const filterKeys = Object.keys(filters);
    console.log("Filter Keys:", filterKeys);
    console.log("Poems :", poems);
    console.log("filters: ", filters);
    return arr.filter((eachObj) => {
      return filterKeys.every((eachKey) => {
        if (isNaN(filters[eachKey])) return true;
        return filters[eachKey] === eachObj[eachKey];
      });
    });
  };
  //ON CHANGE SEARCH KEY --------------------------
  const handleChangeKey = (e) => {
    setKeyword(e.target.value);
  };
  //ON CHANGE FILTERS ------------------------------
  const handleChangeFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: parseInt(value, 10),
    }));
  };
  //SEARCH END ---------------------------------------
  return (
    <div className="row mt-4">
      <Sidebar
        authors={authors}
        poems={poems}
        genres={genres}
        keyword={keyword}
        selectedAuthor={filters.author_id}
        onClick={handleSearch}
        onChange={handleChangeKey}
        onChangeFilters={handleChangeFilters}
      />
      <Switch>
        <Route
          exact
          path="/"
          component={() => <List poems={list} message={message} />}
        />
        <Route exact path="/detail/:id" component={Detail} />
      </Switch>
    </div>
  );
};

//State'teki tüm verileri filtrelemek yerine doğrudan backend'den aktif veriler çekilmeli
//aktif olan author verilerini filtrele
function getActiveDatas(datas) {
  return datas.filter((data) => data.is_active === 1);
}
function getActivePoems(poems) {
  return poems.filter(
    (poem) => poem.is_active === 1 && poem.author.is_active === 1
  );
}
const mapStateToProps = (state) => {
  let authors = getActiveDatas(state.authors);
  let poems = getActivePoems(state.poems);
  let genres = getActiveDatas(state.genres);
  return {
    authors,
    poems,
    genres,
  };
};

const mapDispatchToProps = {
  getAuthors,
  getPoems,
  getGenres,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Master));
