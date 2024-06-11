import styles from "./dashboard.css";
import {navigateTo} from "../../../Router"

export function DashboardScene(){
const $root = document.getElementById('root');
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
<div class=${styles["vuelos"]} id="vuelos">
</div>

`
//Logica del logout
const $logout = document.getElementById('logout');
$logout.addEventListener('click',()=>{
    localStorage.clear('token','rol');
    navigateTo("/login");
})

//Logica de mostrar vuelos
const $vuelos = document.getElementById('vuelos');
const rol = localStorage.getItem('rol');
const mostrarVuelos = async ()=>{
    const responseVuelos = await fetch("http://localhost:3000/vuelos");
    const vuelosdb = await responseVuelos.json();
    if(rol==1){
        $vuelos.innerHTML=`
            ${
                vuelosdb.map((vuelo)=>`
                    <div class="${styles["vuelo"]}" id="vuelo">
                        <h3>${vuelo.number}</h3>
                        <h4>${vuelo.origin} - ${vuelo.destination}</h4>
                        <p>Departure: ${new Date(vuelo.departure)}</p>
                        <p>Arrival: ${new Date(vuelo.arrival)}</p>
                        <h4>Capacity: ${vuelo.capacity}</h4>
                        <div class=${styles["action-buttons"]}>
                            <button vuelo="${vuelo.id}" id="editar">Editar</button>
                            <button vuelo="${vuelo.id}" id="eliminar">Eliminar</button>
                        </div>
                    </div>
                    `
                )
            }
        `;    
    }else{
        $vuelos.innerHTML=`
            ${
                vuelosdb.map((vuelo)=>`
                    <div class="${styles["vuelo"]}" id="vuelo">
                        <h3>${vuelo.number}</h3>
                        <h4>${vuelo.origin} - ${vuelo.destination}</h4>
                        <p>Departure: ${new Date(vuelo.departure)}</p>
                        <p>Arrival: ${new Date(vuelo.arrival)}</p>
                        <h4>Capacity: ${vuelo.capacity}</h4>
                        <div class=${styles["action-buttons"]}>
                            <button vuelo="${vuelo.id}" id="reservar">Reservar</button>
                        </div>
                    </div>
                    `
                )
            }
        `; 
    }
}
mostrarVuelos();

//Logica para eliminar vuelo
if(rol==1){
    const $eliminarVuelo = document.getElementById('eliminar');
    console.log($eliminarVuelo);
    $eliminarVuelo.addEventListener('click', ()=>{
        console.log($eliminarVuelo);
    })
}
}