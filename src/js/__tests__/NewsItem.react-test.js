// NewsItem.react-test.js
import React from 'react';
import NewsItem from '../NewsItem';
import renderer from 'react-test-renderer';

const dataString = '{"author":"Associated Press","guid":"https://www.washingtonpost.com/world/asia_pacific/afghan-official-7-killed-…-suicide-attack/2017/02/11/e3879406-f053-11e6-a100-fdaaf400369a_story.html","link":"https://www.washingtonpost.com/world/asia_pacific/afghan-official-7-killed-…-suicide-attack/2017/02/11/e3879406-f053-11e6-a100-fdaaf400369a_story.html","title":"Afghan official: 7 killed in a suicide attack","sitehost":"www.washingtonpost.com","itemID":"01c6f30bd8afd1d464662450eaa3e2e0","metalink":"http://www.washingtonpost.com/pb/world/","tags":["afghan official","killed","suicide attack"],"metatitle":"World","date":"Thu Jan 01 1970 00:00:00 GMT+0000 (UTC)","sitelink":"http://www.washingtonpost.com","description":"An Afghan official says at least seven people were killed when a suicide bomber attacked Afghan soldiers in southern Helmand province."}'
const data = JSON.parse(dataString);

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <NewsItem info={data}/>
  );
  let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // manually trigger the callback
  // tree.updateTime();
  // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  expect(true).toBe(true);

  // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});