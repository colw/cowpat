// NewsItem.react-test.js
import React from 'react';
import renderer from 'react-test-renderer';

import { LinkExt } from '../components';

test('External Link renders correctly', () => {
  const component = renderer.create(
    <LinkExt href="http://www.ruminant.press">
      <div className="headTitle">
        Ruminant
      </div>
    </LinkExt>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
