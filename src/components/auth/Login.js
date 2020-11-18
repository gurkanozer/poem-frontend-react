import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import TextInput from "../toolbox/TextInput";
import { login } from "../../redux/actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { email, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card bg-white card-body mt-5">
          <h2 className="text-center">Giriş Yap</h2>
          <form onSubmit={this.onSubmit}>
            <TextInput
              name="email"
              type="email"
              placeHolder="Eposta..."
              label="Eposta:"
              onChange={this.onChange}
              value={email}
            />
            <TextInput
              name="password"
              type="password"
              placeHolder="Şifre..."
              label="Şifre:"
              onChange={this.onChange}
              value={password}
            />
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Giriş Yap
              </button>
            </div>
            <p>
              Kayıtlı bir hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
