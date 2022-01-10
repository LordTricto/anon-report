import { ADMIN, USER } from "../types/types";

export const setAdmin = (data) => {
  return {
    type: ADMIN,
    payload: data,
  };
};
export const setUser = () => {
  return {
    type: USER,
  };
};
