import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import NewProjectForm from './NewProjectForm';

const mockStore = configureMockStore();
const store = mockStore({});

describe('NewProjectForm', () => {
  it('should update name on input change', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <NewProjectForm />
      </Provider>,
    );

    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Project' } });

    expect(input).toHaveValue('New Project');
  });
});
