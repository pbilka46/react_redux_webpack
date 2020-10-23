import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field } from "formik";
import * as Yup from "yup";
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';

import { signupAction } from '../../../actions';

import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';

import FormBase from '../../common/Form';

const Wrapper = styled.div`
  margin-top: 2rem
`;

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

const renderErrors = data => (
  Object.keys(data).map(errKey => data[errKey].map((err, index) => (<p key={index}>{err}</p>))));

const SingUpForm = (props) => {
  const [errors, setErrors] = useState([]);
  const handleLogin = (values) => {
    props.signupAction(values).then(
      () => props.history.push('/groups'),
      (err) => {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors);
        }
      }
    );
  };

  return (
    <Wrapper>
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
        <Field
          type="password"
          name="password_confirmation"
          ariaLabel="Hasło, jeszcze raz"
          component={FormField}
        />
        <Button type="submit">Stwórz konto</Button>
        { !isEmpty(errors) && renderErrors(errors) }
      </FormBase>
    </Wrapper>
  );
};

SingUpForm.defaultProps = {

};

const mapDispatchToProps = dispatch => bindActionCreators({
  signupAction
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(SingUpForm));
