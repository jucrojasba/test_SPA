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
    localStorage.clear('token','rol','idVueloEdit');
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
                            <button class="editar" vuelo="${vuelo.id}">Editar</button>
                            <button class="eliminar" vuelo="${vuelo.id}">Eliminar</button>
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
                            <button class="reservar" vuelo="${vuelo.id}">Reservar</button>
                        </div>
                    </div>
                    `
                )
            }
        `; 
    }
    //Logica para eliminar vuelo
    if(rol==1){
        const $eliminarVuelo = document.querySelectorAll('.eliminar');
        $eliminarVuelo.forEach(e=>e.addEventListener('click', async()=>{
            const responseVuelo = await fetch(`http://localhost:3000/vuelos/${e.getAttribute('vuelo')}`);
            const nombreVuelo = await responseVuelo.json();
            if(confirm(`¿Desea eliminar el vuelo ${nombreVuelo.number}?`)) {
                try {
                    const responseEliminar = await fetch(`http://localhost:3000/vuelos/${e.getAttribute('vuelo')}`,
                      {
                        method: "DELETE",
                        headers:{
                          "Content-Type": "aplication/json"
                        },
                      }
                    );
                    alert("Vuelo eliminado");
                    location.reload();
                  } catch (error) {
                    console.log(error);
                  };
            }           
        })
    )}

    //Logica para editar vuelo
    if(rol==1){
        const $editarVuelo = document.querySelectorAll('.editar');
        $editarVuelo.forEach(e=>e.addEventListener('click', ()=>{
            localStorage.setItem('idVueloEdit', e.getAttribute('vuelo'));
            navigateTo("/editar");       
        })
    )}
}
mostrarVuelos();
console.log
}