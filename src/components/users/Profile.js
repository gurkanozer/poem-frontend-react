import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Form from "./Form";
import PasswordForm from "./PasswordForm";
import { updateUser } from "../../redux/actions/authAction";

const Profile = ({ selectedUser, updateUser, history, ...props }) => {
  const [user, setUser] = useState({ ...selectedUser });
  const [step, setStep] = useState(1);
  //Next step sonraki sayfaya geçmek için
  const nextStep = () => {
    setStep((step) => step + 1);
  };
  //Prev step önceki sayfaya dönmek için
  const prevStep = () => {
    setStep((step) => step - 1);
  };

  useEffect(() => {
    setUser((prev) => ({ ...selectedUser }));
  }, [selectedUser]);

  //CANCEL -------------------------------
  const cancel = (e) => {
    e.preventDefault();
    redirect();
  };
  //REDIRECT ----------------------------------
  const redirect = () => {
    history.push("/");
  };
  //ON CHANGE EVENT ------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //UPDATE USER
  const handleEdit = () => {
    updateUser(user);
    redirect();
  };
  switch (step) {
    case 1:
      return (
        <div className="col-md-8 offset-md-1 mt-3 p-0">
          <Form
            user={user}
            formTitle="Kullanıcı Bilgileri"
            onChange={handleChange}
            onSubmit={handleEdit}
            cancel={cancel}
            nextStep={nextStep}
          />
        </div>
      );
    case 2:
      return (
        <div className="col-md-8 offset-md-1 mt-3 p-0">
          <PasswordForm
            user={user}
            formTitle="Şifre Değiştir"
            onChange={handleChange}
            onSubmit={handleEdit}
            cancel={cancel}
            prevStep={prevStep}
          />
        </div>
      );
    default:
      break;
  }
};
function mapStateToProps(state) {
  return {
    selectedUser: state.auth.user,
  };
}
export default connect(mapStateToProps, { updateUser })(Profile);
