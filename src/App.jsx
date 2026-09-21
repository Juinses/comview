// src/App.jsx
import React, { useState, useContext } from 'react';
import Header from './components/Header';
import CommissionForm from './components/CommissionForm';
import ComissionCard from './components/ComissionCard';
import KanbanColumn from './components/KanbanColumn';
import EncargoModal from './components/EncargoModal';
import Login from './components/Login'; // <-- Importamos la barrera de seguridad
import { LeafTopLeft, LeafBottomRight } from './components/BackgroundLeaves';

import { ContextoEncargos } from './contexto/encargos_context';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';

function App() {
  // Extraemos usuario y cargando del contexto
  const { encargos, guardar_encargo, mover_encargo, usuario, cargando } = useContext(ContextoEncargos);

  const [mostrar_formulario, set_mostrar_formulario] = useState(false);
  const [vista_actual, set_vista_actual] = useState('activas');
  const [encargo_seleccionado, set_encargo_seleccionado] = useState(null);

  const manejar_guardado = (nuevo_encargo) => {
    guardar_encargo(nuevo_encargo);
    set_mostrar_formulario(false);
    set_vista_actual('activas');
  };

  const encargos_filtrados = encargos.filter(e => 
    vista_actual === 'activas' ? !e.es_historial : e.es_historial
  );

  const sensores = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  const manejar_soltar = (evento) => {
    const { active, over } = evento;
    if (!over) return;

    const id_encargo = active.id;
    const nueva_fase = parseInt(over.id);

    mover_encargo(id_encargo, nueva_fase);
  };

  const nombres_fases = ['Boceto', 'Lineart', 'Color', 'Terminado'];

  // BARRERA 1: Mostramos mensaje mientras Supabase verifica la sesión
  if (cargando) {
    return <div className="min-h-screen bg-[var(--color-com-bg)] flex items-center justify-center font-sans text-gray-500">Conectando bóveda segura...</div>;
  }

  // BARRERA 2: Si no hay usuario, mostramos el Login
  if (!usuario) {
    return <Login />;
  }

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

      <main className="relative z-10 flex-grow max-w-[1400px] mx-auto w-full px-6 py-8">
        <header className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-[var(--color-com-text)]">
            {vista_actual === 'activas' ? 'Tablero de Comisiones' : 'Historial de comisiones'}
          </h1>
        </header>

        {mostrar_formulario && <CommissionForm on_guardar={manejar_guardado} />}

        {vista_actual === 'activas' ? (
          <DndContext sensors={sensores} collisionDetection={closestCenter} onDragEnd={manejar_soltar}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-8">
              {nombres_fases.map((nombre, indice_fase) => (
                <KanbanColumn key={indice_fase} id_columna={indice_fase.toString()} titulo={nombre}>
                  {encargos_filtrados
                    .filter(e => e.fase === indice_fase)
                    .map(encargo_actual => (
                      <ComissionCard 
                        key={encargo_actual.id} 
                        encargo={encargo_actual} 
                        vista_actual={vista_actual}
                        al_seleccionar={set_encargo_seleccionado}
                      />
                  ))}
                </KanbanColumn>
              ))}
            </div>
          </DndContext>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {encargos_filtrados.length === 0 ? (
               <p className="col-span-full text-center text-gray-400 font-sans py-10">Tu historial está vacío.</p>
            ) : (
              encargos_filtrados.map(encargo_actual => (
                <ComissionCard 
                  key={encargo_actual.id} 
                  encargo={encargo_actual} 
                  vista_actual={vista_actual}
                  al_seleccionar={set_encargo_seleccionado}
                />
              ))
            )}
          </div>
        )}
      </main>

      {/* Modal de Detalle Expandido */}
      {encargo_seleccionado && (
        <EncargoModal 
          encargo={encargo_seleccionado} 
          al_cerrar={() => set_encargo_seleccionado(null)} 
        />
      )}
    </div>
  );
}

export default App;