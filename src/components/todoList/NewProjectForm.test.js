import configureStore from 'redux-mock-store';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import NewProjectForm from './NewProjectForm';

const mockStore = configureStore();

describe('NewProjectForm', () => {
  it('renders something', () => {
    const store = mockStore({});
    const newProjectForm = mount(
      <Provider store={store}>
        <NewProjectForm />
      </Provider>,
    );

    expect(newProjectForm.find('#new-project-form')).to.have.lengthOf(1);
  });
});
