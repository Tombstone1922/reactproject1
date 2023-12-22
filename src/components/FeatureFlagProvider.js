// FeatureFlagContext.js
import React, { createContext, useContext, useState } from 'react';

const FeatureFlagContext = createContext();

export const FeatureFlagProvider = ({ children }) => {
  const [showItems, setShowItems] = useState(true);

  const toggleShowItems = () => {
    setShowItems((prevShowItems) => !prevShowItems);
  };

  return (
    <FeatureFlagContext.Provider value={{ showItems, toggleShowItems }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlag = () => {
  return useContext(FeatureFlagContext);
};
