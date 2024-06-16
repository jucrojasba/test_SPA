import styles from "./editar.css"

export function EditarScene(){
    const $root = document.getElementById('root');

    //Logica para traer el nombre del vuelo que se editara
    const vuelo = async()=>{
        const responseVuelo = await fetch(`http://localhost:3000/vuelos/${localStorage.getItem('idVueloEdit')}`);
        await responseVuelo.json();
     }
     console.log(vuelo)
     const numberFlight = vuelo().number;
    //Formulario de edición
    $root.innerHTML=`
    <div class="${styles["upper-bar"]}">
        <h3>Vuelos actuales</h3>
        <nav>
        <ul>
            <li><button id="reservas">Reservas</button></li>
            <li><button id="logout">Logout</button></li>
            <li id="crearVuelo"></li>
        </ul>
        </nav>
    </div>
    <div class=${styles["edit-form"]}>
        <form id="editForm">
        <h3>Editar Vuelo ${numberFlight}</h3>
        <input type="text" id="number" maxlength="20" placeholder="Ingresa el numero de vuelo" required>
        <input type="text" id="origin" maxlength="50" placeholder="Ingresa el lugar de origen" required>
        <input type="text" id="destination" maxlength="50" placeholder="Ingresa el lugar de destino" required>
        <h4>Fecha de salida</h4>
        <input type="datetime-local" id="departure" required>
        <h4>Fecha de llegada</h4>
        <input type="datetime-local" id="arrival" required>
        <h4>Capacidad</h4>
        <input type="number" id="capacity" min="10" max="300" placeholder="10" required>
        <button type="submit">Editar<button>
        </form>
    </div>
    `
    
}