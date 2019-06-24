import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { loginAction } from '../../../actions';

import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';

import FormBase from '../../common/Form';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Niepoprawny email')
    .required('Wymagane'),
  password: Yup.string()
    .min(5, "Minimum 5 znaków")
    .required("Wymagane")
});


const LoginForm = (props) => {
  const [message, setMessage] = useState('');
  
  const handleLogin = (values) => {
    props.loginAction(values).then(
      () => props.history.push('/group'),
      () => setMessage('Wrong credentials.')
    )
  };
  
  return (
    <FormBase
      title="Zaloguj się"
      action={handleLogin}
      validationSchema={validationSchema}
      initialValues={{
        email: 'patryk.bilka@gmail.com',
        password: '123qwe'
      }}
    >
      <p>{message}</p>
      <Field name="email" ariaLabel="E-mail" component={FormField} />
      <Field type="password" name="password" ariaLabel="Hasło" component={FormField} />
      <Button type="submit">Zaloguj</Button>
    </FormBase>
  )
};

LoginForm.defaultProps = {

};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginAction
  }, dispatch);
};

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));

