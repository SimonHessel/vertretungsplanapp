import { User } from "../interfaces/User";

export type UserType = User | null;
export type UserAction = { type: "UPDATE_USER"; payload: UserType };

export default (state: UserType, action: UserAction) => {
  switch (action.type) {
    case "UPDATE_USER":
      return action.payload;
    default:
      return state;
  }
};
