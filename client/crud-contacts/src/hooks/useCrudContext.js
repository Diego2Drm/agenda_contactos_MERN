import { useContext } from "react";
import { CrudContext } from "../Context/userContext";


export const useCrudContext = () => {
  return useContext(CrudContext)
}
