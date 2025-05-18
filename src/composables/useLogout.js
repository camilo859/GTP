import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';


export function useLogout() {
  const router = useRouter();
  const $toast = useToast();
  

  const logout = () => {

    localStorage.removeItem('idUsuario');
    $toast.info('Sesión cerrada correctamente',);
    router.push('/login');
  };

  return {
    logout
  };
}