import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import { FilterValues } from "../interfaces/FilterValues";
import userReducer, { UserType, UserAction } from "./UserReducer";
import filterValuesReducer, { FilterValuesAction } from "./FilterValuesReducer";

type InitialStateType = {
  user: UserType;
  filterValues: FilterValues;
};
const stateString = localStorage.getItem("state");
const localState = stateString ? JSON.parse(stateString) : null;

const initialState: InitialStateType = {
  user: null,
  filterValues: { courses: [] },
};

const AppContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<UserAction | FilterValuesAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const contextReducer = (
  { user, filterValues }: InitialStateType,
  action: UserAction | FilterValuesAction
) => ({
  filterValues: filterValuesReducer(filterValues, action as FilterValuesAction),
  user: userReducer(user, action as UserAction),
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    contextReducer,
    localState || initialState
  );

  useEffect(() => localStorage.setItem("state", JSON.stringify(state)), [
    state,
  ]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
