import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { signupAction } from '../../../actions';

import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';

import FormBase from '../../common/Form';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Minimum 5 znaków")
    .required("Wymagane"),
  email: Yup.string()
    .email('Niepoprawny email')
    .required('Wymagane'),
  password: Yup.string()
    .min(6, "Minimum 6 znaków")
    .required("Wymagane"),
  password_confirmation: Yup.string()
    .required('Wymagane')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const LoginForm = (props) => {
  const handleLogin = (values) => {
    props.signupAction(values);
  };
  
  return (
    <FormBase
      title="Stwórz konto"
      action={handleLogin}
      validationSchema={validationSchema}
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }}
    >
      <Field name="name" ariaLabel="Nazwa użytkownika" component={FormField} />
      <Field name="email" ariaLabel="E-mail" component={FormField} />
      <Field type="password" name="password" ariaLabel="Hasło" component={FormField} />
      <Field type="password" name="password_confirmation" ariaLabel="Hasło, jeszcze raz" component={FormField} />
      <Button type="submit">Stwórz konto</Button>
    </FormBase>
  )
};

LoginForm.defaultProps = {

};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    signupAction
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginForm);

