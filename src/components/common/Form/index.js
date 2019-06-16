import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { loginAction } from '../../../actions';

import Heading from '../../atoms/Text/Heading';

import ViewWrapper from '../../common/ViewWrapper/ViewWrapper';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Niepoprawny email')
    .required('Wymagane'),
  password: Yup.string()
    .min(5, "Minimum 5 znaków")
    .required("Wymagane")
});


const FormComponent = (props) => {
  const handleSubmit = (values) => {
    props.action(values);
  };
  
  return (
    <ViewWrapper>
      <Heading
        variant="h1"
      >{props.title}</Heading>
      <Formik
        initialValues={props.initialValues}
        onSubmit={handleSubmit}
        validationSchema={props.validationSchema}
      >
        <Form autoComplete="off">
          {props.children}
        </Form>
      </Formik>
    </ViewWrapper>
  )
};

FormComponent.defaultProps = {
  validationSchema
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loginAction
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(FormComponent);

