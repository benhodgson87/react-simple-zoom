import React from 'react';
import ReactDOM from 'react-dom';

import Example from './Example';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Example);

if (module.hot) {
  module.hot.accept('./Example', () => {
    render(Example)
  });
}
