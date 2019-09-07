import React from 'react';
import PageBase from "../PageBase";

import CreateGroupForm from '../../organisms/CreateGroupForm';

const GroupCreate = () => {
  
  return (
    <PageBase
      title="Tworzenie nowej grupy"
    >
      <CreateGroupForm />
    </PageBase>
  )
};

export default GroupCreate;
