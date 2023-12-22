import React, { useContext } from 'react';
import { FeatureFlagContext } from '../FeatureFlagContext';

const ToggleItemsButton = () => {
  const { toggleShowItems } = useContext(FeatureFlagContext);

  return (
    <button onClick={toggleShowItems}>
      Переключить отображение товаров
    </button>
  );
};

export default ToggleItemsButton;
