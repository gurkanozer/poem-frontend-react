import { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

//CSS
import "./styles/custom.css";

//Components
import Navbar from "./components/layouts/Navi";
import Home from "./home/Master";
//POEM
import PoemList from "./components/poems/List";
import PoemEdit from "./components/poems/Edit";
import PoemAdd from "./components/poems/Add";
//AUTHOR
import AuthorList from "./components/authors/List";
import AuthorAdd from "./components/authors/Add";
import AuthorEdit from "./components/authors/Edit";
//GENRE
import GenreList from "./components/genres/List";
import GenreAdd from "./components/genres/Add";
import GenreEdit from "./components/genres/Edit";
//AUTH
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/users/Profile";

//React Alert
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Alerts from "./components/layouts/Alerts";

import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./redux/actions/authAction";
import store from "./redux/store";
//Alert Option
const alertOptions = {
  timeout: 3000,
  position: "top right",
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <div className="container">
          <Navbar />
          <Alerts />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />

            <PrivateRoute exact path="/poems" component={PoemList} />
            <PrivateRoute exact path="/poems/add" component={PoemAdd} />
            <PrivateRoute exact path="/poems/edit/:id" component={PoemEdit} />

            <PrivateRoute exact path="/authors" component={AuthorList} />
            <PrivateRoute exact path="/authors/add" component={AuthorAdd} />
            <PrivateRoute
              exact
              path="/authors/edit/:id"
              component={AuthorEdit}
            />

            <PrivateRoute exact path="/genres" component={GenreList} />
            <PrivateRoute exact path="/genres/add" component={GenreAdd} />
            <PrivateRoute exact path="/genres/edit/:id" component={GenreEdit} />

            <Route path="/" component={Home} />
          </Switch>
        </div>
      </AlertProvider>
    );
  }
}

export default withRouter(App);
