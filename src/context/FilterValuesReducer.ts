import { FilterValues } from "../interfaces/FilterValues";

export type FilterValuesAction =
  | { type: "ADD_CLASS"; payload: string }
  | { type: "ADD_KEY"; payload: string }
  | { type: "ADD_COURSE"; payload: string }
  | { type: "REMOVE_CLASS_OR_KEY"; payload: string }
  | { type: "REMOVE_COURSE"; payload: string }
  | { type: "LOAD_CACHE"; payload: FilterValues };

export default (state: FilterValues, action: FilterValuesAction) => {
  switch (action.type) {
    case "ADD_CLASS":
      return { ...state, class: action.payload };
    case "ADD_KEY":
      return { ...state, key: action.payload };
    case "ADD_COURSE":
      return { ...state, courses: [...state.courses, action.payload] };
    case "REMOVE_CLASS_OR_KEY":
      return {
        courses: state.courses,
      };
    case "REMOVE_COURSE":
      return {
        ...state,
        courses: state.courses.filter((item) => item !== action.payload),
      };
    case "LOAD_CACHE":
      return action.payload;
    default:
      return state;
  }
};
