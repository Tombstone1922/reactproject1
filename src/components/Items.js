// Items.js
import React from 'react';
import Item from './Item';
import { useFeatureFlag } from '../FeatureFlagContext';

const Items = (props) => {
  const { showItems } = useFeatureFlag();

  if (!showItems) {
    return null;
  }

  if (!props.items || props.items.length === 0) {
    return (
      <div className="empty">
        <h2>Товаров нет</h2>
      </div>
    );
  }

  return (
    <main>
      {props.items.map((el) => (
        <Item key={el.id} item={el} onAdd={props.onAdd} onShowItem={props.onShowItem} />
      ))}
    </main>
  );
};

export default Items;
