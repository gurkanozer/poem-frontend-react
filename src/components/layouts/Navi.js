import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/authAction";

function Navi({ auth, logout, ...props }) {
  const { isAuthenticated, user } = auth;

  let history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/");
  };
  const authLinks = (
    <Nav className="ml-auto">
      <Nav.Link href={`/profile/${user ? user.id : ""}`}>
        {user ? user.name : ""}
      </Nav.Link>
      <Nav>
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          <i className="fa fa-sign-out"></i> Çıkış
        </button>
      </Nav>
    </Nav>
  );
  const guestLinks = (
    <Nav className="ml-auto">
      <Nav.Link href="/register">Kayıt Ol</Nav.Link>
      <Nav.Link href="/login">Giriş Yap</Nav.Link>
    </Nav>
  );
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">Brand</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {isAuthenticated ? (
          <Nav className="mr-auto">
            <Nav.Link href="/poems">Şiirler</Nav.Link>
            <Nav.Link href="/authors">Şairler</Nav.Link>
            <Nav.Link href="/genres">Kategoriler</Nav.Link>
          </Nav>
        ) : (
          ""
        )}
        {isAuthenticated ? authLinks : guestLinks}
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navi);

Navi.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
