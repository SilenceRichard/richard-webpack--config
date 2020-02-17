// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { render } from 'react-dom';

import App from '@/App';
import './index.scss';

if (module.hot) {
  module.hot.accept(() => {
    console.log('update module');
    render(<App />, document.getElementById('root'));
  });
}
render(<App />, document.getElementById('root'));
