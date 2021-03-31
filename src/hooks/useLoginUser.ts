import { useContext } from "react";
import {
  LoginUserContext,
  LoginUserContextType
} from "../providers/LoginUserProviser";

export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
