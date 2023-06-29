import './styles/tailwind.css';
import 'react-day-picker/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useRoutes } from 'react-router-dom';
import { routes } from './infrastructure/appRoute/routes';

function App() {
  const AppRoutes = useRoutes(routes);

  return AppRoutes;
}

export default App;
