import { routes } from "./helpers/routes";
export function Router() {
  const path = window.location.pathname;
  const publicRoute = routes.public.find((route) => route.path === path);
  const privateRoute = routes.private.find((route) => route.path === path);

  if (publicRoute) {
    publicRoute.scene();
    return;
  }
  navigateTo("/not-found");
}

// Navegar a una nueva ruta
export function navigateTo(path) {
  window.history.pushState({}, "", window.location.origin + path);
  Router();
}
