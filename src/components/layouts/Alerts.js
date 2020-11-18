import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg === "Unauthorized")
        alert.error("Eposta ya da şifre hatalı!");
      if (error.msg === "User_Created_Fail")
        alert.error("Hesap oluşturlamadı.");
    }
    if (message !== prevProps.message) {
      //POEM
      if (message.poemAdded) alert.success(message.poemAdded);
      if (message.poemDeleted) alert.success(message.poemDeleted);
      if (message.poemUpdated) alert.success(message.poemUpdated);
      //AUTHOR
      if (message.authorAdded) alert.success(message.authorAdded);
      if (message.authorDeleted) alert.success(message.authorDeleted);
      if (message.authorUpdated) alert.success(message.authorUpdated);
      //GENRE
      if (message.genreAdded) alert.success(message.genreAdded);
      if (message.genreDeleted) alert.success(message.genreDeleted);
      if (message.genreUpdated) alert.success(message.genreUpdated);
      //OTHERS
      if (message.text) alert.success(message.text);
      if (message.userAdded) alert.success(message.userAdded);
    }
  }
  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
