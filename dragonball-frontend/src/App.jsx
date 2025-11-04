import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import PersonajesList from './pages/Personajes/PersonajesList';
import PersonajeModal from './pages/Personajes/PersonajeModal';
import RazasList from './pages/Razas/RazasList';
import RazaModal from './pages/Razas/RazaModal';
import PlanetasList from './pages/Planetas/PlanetasList';
import PlanetaModal from './pages/Planetas/PlanetaModal';
import SagasList from './pages/Sagas/SagasList';
import SagaModal from './pages/Sagas/SagaModal';
import TecnicasList from './pages/Tecnicas/TecnicasList';
import TecnicaModal from './pages/Tecnicas/TecnicaModal';
import TransformacionesList from './pages/Transformaciones/TransformacionesList';
import TransformacionModal from './pages/Transformaciones/TransformacionModal';
import BatallasList from './pages/Batallas/BatallasList';
import BatallaModal from './pages/Batallas/BatallaModal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          
          {/* Personajes Routes */}
          <Route path="personajes" element={<PersonajesList />}>
            <Route path="nuevo" element={<PersonajeModal mode="create" />} />
            <Route path=":id" element={<PersonajeModal mode="view" />} />
            <Route path=":id/editar" element={<PersonajeModal mode="edit" />} />
          </Route>
          
          {/* Razas Routes */}
          <Route path="razas" element={<RazasList />}>
            <Route path="nueva" element={<RazaModal mode="create" />} />
            <Route path=":id" element={<RazaModal mode="view" />} />
            <Route path=":id/editar" element={<RazaModal mode="edit" />} />
          </Route>
          
          {/* Planetas Routes */}
          <Route path="planetas" element={<PlanetasList />}>
            <Route path="nuevo" element={<PlanetaModal mode="create" />} />
            <Route path=":id" element={<PlanetaModal mode="view" />} />
            <Route path=":id/editar" element={<PlanetaModal mode="edit" />} />
          </Route>
          
          {/* Sagas Routes */}
          <Route path="sagas" element={<SagasList />}>
            <Route path="nueva" element={<SagaModal mode="create" />} />
            <Route path=":id" element={<SagaModal mode="view" />} />
            <Route path=":id/editar" element={<SagaModal mode="edit" />} />
          </Route>
          
          {/* Tecnicas Routes */}
          <Route path="tecnicas" element={<TecnicasList />}>
            <Route path="nueva" element={<TecnicaModal mode="create" />} />
            <Route path=":id" element={<TecnicaModal mode="view" />} />
            <Route path=":id/editar" element={<TecnicaModal mode="edit" />} />
          </Route>

          {/* Transformaciones Routes */}
          <Route path="transformaciones" element={<TransformacionesList />}>
            <Route path="nueva" element={<TransformacionModal mode="create" />} />
            <Route path=":id" element={<TransformacionModal mode="view" />} />
            <Route path=":id/editar" element={<TransformacionModal mode="edit" />} />
          </Route>

          {/* Batallas Routes */}
          <Route path="batallas" element={<BatallasList />}>
            <Route path="nueva" element={<BatallaModal mode="create" />} />
            <Route path=":id" element={<BatallaModal mode="view" />} />
            <Route path=":id/editar" element={<BatallaModal mode="edit" />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;