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
  //Logica para registrarse 
  const $register = document.getElementById("registerForm");
  
  $register.addEventListener("submit", async(e) => {
    e.preventDefault();
    const $nombre = document.getElementById("nombre").value;
    const $email = document.getElementById("email").value;
    const $birthday = document.getElementById("birthday").value;
    const $password = document.getElementById("password").value;
    if(confirm(`${$nombre}, ¿Estas seguro que deseas registrarte con la informacion proporcionada?`)){
      const newUser = {
        name: $nombre,
        email: $email,
        birthday: $birthday,
        password: $password,
        rolId: 2
      };
      try {
        const postRegister = await fetch("http://localhost:3000/users",
          {
            method: "POST",
            headers:{
              "Content-Type": "aplication/json"
            },
            body: JSON.stringify(newUser)
          }
        );
        alert("Usuario creado exitosamente");
        navigateTo("/login");
      } catch (error) {
        console.log(error);
      };
    }
    
  });
}
