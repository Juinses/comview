import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CommissionForm from './components/CommisionForm';
import ComissionCard from './components/commision_card';
import { LeafTopLeft, LeafBottomRight } from './components/BackgroundLeaves';

function App() {
  const [encargos, set_encargos] = useState(() => {
    const guardados = localStorage.getItem('comview_encargos');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [mostrar_formulario, set_mostrar_formulario] = useState(false);
  
  // Nuevo estado para controlar qué pestaña vemos (cumpliendo snake_case)
  const [vista_actual, set_vista_actual] = useState('activas'); 

  useEffect(() => {
    localStorage.setItem('comview_encargos', JSON.stringify(encargos));
  }, [encargos]);

  const avanzar_fase = (id_encargo) => {
    set_encargos(encargos.map(encargo => {
      if (encargo.id === id_encargo && encargo.fase < 3) {
        return { ...encargo, fase: encargo.fase + 1 };
      }
      return encargo;
    }));
  };

  const archivar_encargo = (id_encargo) => {
    set_encargos(encargos.map(encargo => {
      if (encargo.id === id_encargo) {
        return { ...encargo, es_historial: true };
      }
      return encargo;
    }));
  };

  // Nueva función para devolver un encargo al tablero principal
  const restaurar_encargo = (id_encargo) => {
    set_encargos(encargos.map(encargo => {
      if (encargo.id === id_encargo) {
        return { ...encargo, es_historial: false };
      }
      return encargo;
    }));
  };

  const guardar_encargo = (nuevo_encargo) => {
    const id_generado = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    set_encargos([...encargos, { ...nuevo_encargo, id: id_generado, fase: 0, es_historial: false }]);
    set_mostrar_formulario(false);
    set_vista_actual('activas'); // Te devuelve a la pestaña principal al crear uno
  };

  // Filtramos la lista dependiendo de la pestaña actual
  const encargos_filtrados = encargos.filter(e => 
    vista_actual === 'activas' ? !e.es_historial : e.es_historial
  );

  return (
    <div className="min-h-screen bg-[var(--color-com-bg)] relative overflow-hidden flex flex-col">
      <LeafTopLeft />
      <LeafBottomRight />

      <Header 
        mostrar_formulario={mostrar_formulario} 
        set_mostrar_formulario={set_mostrar_formulario} 
        vista_actual={vista_actual}
        set_vista_actual={set_vista_actual}
      />

      <main className="relative z-10 flex-grow max-w-5xl mx-auto w-full px-6 py-8">
        
        {/* Título dinámico que le da contexto al usuario de dónde está */}
        <header className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-[var(--color-com-text)]">
            {vista_actual === 'activas' ? 'Tus comisiones activas' : 'Historial de comisiones'}
          </h1>
        </header>

        {mostrar_formulario && <CommissionForm on_guardar={guardar_encargo} />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {encargos_filtrados.length === 0 ? (
             <p className="col-span-full text-center text-gray-400 font-sans py-10">
               {vista_actual === 'activas' ? 'No tienes comisiones activas. ¡Añade una nueva!' : 'Tu historial está vacío.'}
             </p>
          ) : (
            encargos_filtrados.map(encargo_actual => (
              <ComissionCard 
                key={encargo_actual.id} 
                encargo={encargo_actual} 
                on_avanzar={avanzar_fase} 
                on_archivar={archivar_encargo}
                on_restaurar={restaurar_encargo}
                vista_actual={vista_actual}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;