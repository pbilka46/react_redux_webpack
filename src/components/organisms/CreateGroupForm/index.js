import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { createGroupAction } from '../../../actions';

import Button from '../../atoms/Button';
import FormField from '../../molecules/FormField';

import FormBase from '../../common/Form';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Wymagane'),
});


const CreateGroupForm = (props) => {
  const [message, setMessage] = useState('');
  
  const handleLogin = (values) => {
    props.createGroupAction(values);
  };
  
  return (
    <FormBase
      action={handleLogin}
      validationSchema={validationSchema}
      initialValues={{
        name: 'nazwa',
        description: 'Opis'
      }}
    >
      <p>{message}</p>
      <Field name="name" ariaLabel="Nazwa grupy" component={FormField} />
      <Field name="description" ariaLabel="Opis grupy" component={FormField} />
      <Button type="submit">Stwórz</Button>
    </FormBase>
  )
};

CreateGroupForm.defaultProps = {

};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createGroupAction
  }, dispatch);
};

export default withRouter(connect(null, mapDispatchToProps)(CreateGroupForm));

