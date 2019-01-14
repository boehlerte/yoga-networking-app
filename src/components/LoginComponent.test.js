import React from 'react';
import ReactDOM from 'react-dom';
import LoginComponent from './LoginComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
