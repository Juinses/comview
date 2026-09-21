// src/App.jsx
import React, { useState, useContext } from 'react';
import Header from './components/Header';
import CommissionForm from './components/CommissionForm';
import ComissionCard from './components/ComissionCard';
import KanbanColumn from './components/KanbanColumn';
import EncargoModal from './components/EncargoModal';
import Login from './components/Login';
import { LeafTopLeft, LeafBottomRight } from './components/BackgroundLeaves';
import BarraHistorial from './components/BarraHistorial';

import { ContextoEncargos } from './contexto/encargos_context';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';

function App() {
  const { encargos, guardar_encargo, mover_encargo,actualizar_encargo, usuario, cargando } = useContext(ContextoEncargos);

  const [mostrar_formulario, set_mostrar_formulario] = useState(false);
  const [vista_actual, set_vista_actual] = useState('activas');
  const [encargo_seleccionado, set_encargo_seleccionado] = useState(null);
  
  // Estados de la barra del historial
  const [busqueda, set_busqueda] = useState('');
  const [filtro_activo, set_filtro_activo] = useState('Todas');

  const manejar_guardado = async (nuevo_encargo) => {
    try {
      await guardar_encargo(nuevo_encargo);
      set_mostrar_formulario(false);
      set_vista_actual('activas');
    } catch (error) {
      console.error("Error al crear encargo en Supabase:", error);
      alert("Fallo al crear el encargo. Revisa la consola para más detalles.");
    }
  };

  const manejar_actualizacion_modal = async (id, datos_editados) => {
    if (actualizar_encargo) {
      await actualizar_encargo(id, datos_editados);
      // Refrescamos el encargo seleccionado para que los cambios se vean al instante
      set_encargo_seleccionado(prev => ({ ...prev, ...datos_editados }));
    }
  };

  // Lógica unificada de filtrado (Vista + Búsqueda + Filtros)
  const encargos_procesados = encargos.filter(e => {
    // 1. Filtrar por vista actual (Activas vs Historial)
    const es_vista_correcta = vista_actual === 'activas' ? !e.es_historial : e.es_historial;
    if (!es_vista_correcta) return false;

    // 2. Si estamos en activas, mostramos todo lo correspondiente
    if (vista_actual === 'activas') return true;

    // 3. Si estamos en historial, aplicamos la barra de búsqueda
    const coincide_busqueda = (e.cliente || '').toLowerCase().includes(busqueda.toLowerCase());
    return coincide_busqueda;
  }).sort((a, b) => {
    // 4. Aplicar ordenamiento si el filtro es "Mayor valor"
    if (vista_actual === 'historial' && filtro_activo === 'Mayor valor') {
      return (Number(b.precio) || 0) - (Number(a.precio) || 0);
    }
    return 0; // Orden por defecto
  });

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

  // --- CÁLCULO DE MÉTRICAS RÁPIDAS PARA EL TABLERO KANBAN ---
  const metricas = {
    total: encargos_procesados.length,
    ganancias: encargos_procesados.reduce((sum, e) => sum + (Number(e.precio) || 0), 0),
    en_progreso: encargos_procesados.filter(e => e.fase > 0 && e.fase < 3).length
  };

  // BARRERA 1: Mostramos mensaje mientras Supabase verifica la sesión
  if (cargando) {
    return <div className="min-h-screen bg-[var(--color-com-bg)] flex items-center justify-center font-sans text-[var(--color-com-muted)]">Conectando bóveda segura...</div>;
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
        
        {/* Renderizamos condicionalmente el título o la barra de búsqueda */}
        {vista_actual === 'activas' ? (
          <header className="mb-6 flex flex-col items-center">
            <h1 className="font-serif text-4xl font-bold text-[var(--color-com-action)] mb-8">
              ComView
            </h1>
            
            {/* BLOQUE DE MÉTRICAS RÁPIDAS (Mockup Kanban) */}
            <div className="flex flex-wrap justify-center gap-4 w-full mb-6">
              <div className="bg-[var(--color-com-card)] border border-[var(--color-com-border)] rounded-full px-6 py-2.5 flex items-center gap-3 shadow-sm">
                <div className="bg-[var(--color-com-accent)] p-2 rounded-full text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--color-com-text)] font-sans">Total Comisiones:</span>
                  <span className="text-lg font-bold font-sans text-[var(--color-com-action)]">{metricas.total}</span>
                </div>
              </div>

              <div className="bg-[var(--color-com-card)] border border-[var(--color-com-border)] rounded-full px-6 py-2.5 flex items-center gap-3 shadow-sm">
                <div className="bg-[var(--color-com-accent)] p-2 rounded-full text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--color-com-text)] font-sans">Ganancias Mes:</span>
                  <span className="text-lg font-bold font-sans text-[var(--color-com-action)]">${metricas.ganancias} USD</span>
                </div>
              </div>

              <div className="bg-[var(--color-com-card)] border border-[var(--color-com-border)] rounded-full px-6 py-2.5 flex items-center gap-3 shadow-sm">
                <div className="bg-[#D4E0D1] p-2 rounded-full text-[var(--color-com-accent-dark)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[var(--color-com-text)] font-sans">En Progreso:</span>
                  <span className="text-lg font-bold font-sans text-[var(--color-com-action)]">{metricas.en_progreso}</span>
                </div>
              </div>
            </div>
          </header>
        ) : (
          <>
             {/* Renderizado de la barra interactiva en el historial */}
             <BarraHistorial 
                busqueda={busqueda} 
                set_busqueda={set_busqueda} 
                filtro_activo={filtro_activo} 
                set_filtro_activo={set_filtro_activo} 
              />
          </>
        )}

        {mostrar_formulario && (
          <CommissionForm 
            on_guardar={manejar_guardado} 
            al_cerrar={() => set_mostrar_formulario(false)} 
          />
        )}

        {vista_actual === 'activas' ? (
          <DndContext sensors={sensores} collisionDetection={closestCenter} onDragEnd={manejar_soltar}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-8 min-h-[500px]">
              {nombres_fases.map((nombre, indice_fase) => (
                <KanbanColumn key={indice_fase} id_columna={indice_fase.toString()} titulo={nombre}>
                  {encargos_procesados
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
            {encargos_procesados.length === 0 ? (
               <p className="col-span-full text-center text-[var(--color-com-muted)] font-sans py-10">
                 {busqueda ? 'No se encontraron clientes con ese nombre.' : 'Tu historial está vacío.'}
               </p>
            ) : (
              encargos_procesados.map(encargo_actual => (
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
          al_actualizar={manejar_actualizacion_modal}
        />
      )}
    </div>
  );
}

export default App;