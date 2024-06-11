import styles from "./login.css";
import { navigateTo } from "../../../Router";
export function LoginScene() {
  const $root = document.getElementById("root");
  $root.innerHTML = `
  <div class="${styles["container-login"]}">
  <form id="loginForm">
  <h1>Login</h1>
  <input
    type="email"
    name="email"
    id="email"
    placeholder="Ingresa tu email"
  />
  <input
    type="password"
    name="password"
    id="password"
    placeholder="Ingresa tu contraseña"
    required
  />
  <div class="${styles["action-buttons-login"]}">
    <button type="submit">Login</button>
    <button id="register">Register</button>
  </div>
</form>
  </div>
  `;

  //Navegar a la escena registrar
  const $register = document.getElementById("register");
  $register.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo("/register");
  });

  //Logica para loguearse
  const $loginForm = document.getElementById("loginForm");

  $loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const $email = document.getElementById("email").value;
    const $password = document.getElementById("password").value;
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const user = users.find(user => {
      return user.email === $email && user.password === $password;
    });

    if (user) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem("token", token);
      localStorage.setItem("rol", user.rolId);
      navigateTo("/dashboard");
    } else {
      alert("Credenciales inválidas");
    }
  });
}
