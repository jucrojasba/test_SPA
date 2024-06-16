import { routes } from "./helpers/routes";
import { LoginScene } from "./scenes/public/login/login";

export function Router() {
  const path = window.location.pathname;
  const publicRoute = routes.public.find((route) => route.path === path);
  const privateRoute = routes.private.find((route) => route.path === path);
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');
  
  //Si accede a ruta principal y no hay token redirige al login
  if(path === '/' && !token){
    LoginScene();
  }

   //Si accede a ruta editar y rol diferente de admin, redirige al dashboard
   if(path == '/editar' && token && rol!=1){
    navigateTo("/dashboard");
    return;
  }

  //Manejo de rutas publicas
  if(publicRoute) {
    if((path =='/login' || path =='/register') && token){
      navigateTo('/dashboard');
      return;
    }else{
      publicRoute.scene();
      return;
    }
  }

  //Manejo de rutas privadas y autenticacion
  if(privateRoute){
    if(token){
      privateRoute.scene();
      return;
    }else{
      navigateTo('/login');
      return;
    }
  }

  //Si intenta acceder a la ruta principal y hay token redirige al dashboard
  if(path =='/' && token){
    navigateTo('/dashboard');
    return;
  }

  //Si no encuentra la ruta redirige al not-found
  if((!privateRoute || !publicRoute) && path != "/"){
    navigateTo("/not-found");
    return;
  }
}

// Navegar a una nueva ruta
export function navigateTo(path) {
  window.history.pushState({}, "", window.location.origin + path);
  Router();
}
