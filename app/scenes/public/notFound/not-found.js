import styles from "./not-found.css"
export function NotFoundScene() {
  const $root = document.getElementById("root");
  $root.innerHTML = `
  <div class="${styles["container-not-found"]}">
    <h1>Not Found </h1>
    <p>Sorry the page you try to go, does not exist</p>
  </div>
  `;
}
