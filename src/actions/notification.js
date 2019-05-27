import { NOTIFICATION } from "./types.js";

export const notification = (type, title, content, key= null) => ({
  type: NOTIFICATION,
  payload: { type, title, content, key }
});
