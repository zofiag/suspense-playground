import { createContext, Suspense, useContext } from "react";

import { getData } from "./queries";
import { wrapPromise } from "./utils";
import { IResponse, IContext } from "./types";

const DataContext = createContext<IContext<IResponse>>({
  operations: { get: { read: () => undefined } },
});

const ErrorBoundary: React.FC = ({ children }) => <div>{children}</div>;

const PresentationalComponent = () => {
  const {
    operations: { get },
  } = useContext(DataContext);

  return <span>{get.read()?.name}</span>;
};

const DataNavigator: React.FC = ({ children }) => (
  // If error thrown ErrorBoundary catches that
  <ErrorBoundary>
    {/* If still loading Suspense displays fallback */}
    <Suspense fallback={"loading"}>{children}</Suspense>
  </ErrorBoundary>
);

// Render as you fetch
export const DataProvider = () => {
  const value = {
    operations: {
      // We're starting a request in the parent
      get: wrapPromise(getData()),
    },
  };

  return (
    <DataContext.Provider value={value}>
      <DataNavigator>
        <PresentationalComponent />
      </DataNavigator>
    </DataContext.Provider>
  );
};
