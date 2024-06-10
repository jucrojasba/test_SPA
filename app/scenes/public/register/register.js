import styles from "./register.css";
import { navigateTo } from "../../../Router";
export function RegisterScene() {
  const $root = document.getElementById("root");
  $root.innerHTML = `
  <div class="${styles["container-register"]}">
  <form id="registerForm">
      <h1>Register</h1>
      <input
        type="text"
        name="npmbre"
        id="nombre"
        placeholder="Ingresa tu nombre"
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Ingresa tu email"
      />
      <label for="birthday">Fecha de nacimiento</label>
      <input
        type="date"
        name="birthday"
        id="birthday"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Ingresa tu contraseña"
        required
      />
      <div>
        <button type="submit" id="registro">Registrar</button>
      </div>
    </form>
  `;

  const $register = document.getElementById("registerForm");
  console.log($register);
  $register.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Usuario creado exitosamente");
    navigateTo("/login");
  });
}
