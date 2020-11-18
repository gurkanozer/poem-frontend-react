import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "../toolbox/TextInput";
import { register } from "../../redux/actions/authAction";
import PropTypes from "prop-types";

const Register = ({ register, history, ...props }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    register(user);
    redirect();
  };
  //REDIRECT ----------------------------------
  const redirect = () => {
    history.push("/login");
  };
  //ON CHANGE EVENT ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="col-md-6 bg-white m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Kayıt Ol</h2>
        <form onSubmit={onSubmit}>
          <TextInput
            name="name"
            type="text"
            placeHolder="İsim..."
            label="İsim:"
            onChange={handleChange}
            value={user.name}
          />
          <TextInput
            name="email"
            type="email"
            placeHolder="Eposta..."
            label="Eposta:"
            onChange={handleChange}
            value={user.email}
          />
          <TextInput
            name="password"
            type="password"
            placeHolder="Şifre..."
            label="Şifre:"
            onChange={handleChange}
            value={user.password}
          />
          <TextInput
            name="password_confirmation"
            type="password"
            placeHolder="Şifre (tekrar)..."
            label="Şifre (tekrar):"
            onChange={handleChange}
            value={user.password_confirmation}
          />
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Kayıt Ol
            </button>
          </div>
          <p>
            Kayıtlı bir hesabın var mı? <Link to="/login">Giriş Yap</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { register })(Register);

Register.propTypes = {
  register: PropTypes.func.isRequired,
};
