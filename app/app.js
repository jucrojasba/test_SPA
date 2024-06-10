import styles from "./global-styles.css";
import { Router } from "./Router";
export function App() {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Ocurrio un error");
  }
  Router();
}
