import React from 'react';
import './fixture-responsive.css';

// --- Tipos ---
interface Club {
  id: number;
  nombre: string;
}

interface EncuentroAPI {
  id: number;
  jornada: number;
  grupo?: string;
  fecha?: string;
  resultado: string;
  club1Id: number;
  club2Id: number;
  club1: Club;
  club2: Club;
}

interface FixtureAPI {
  id: number;
  fecha: string;
  lugar: string;
  partidos: EncuentroAPI[];
}

// --- Props del Componente ---
interface ListaFixtureProps {
  fixtures: FixtureAPI[];
  onEdit: (fixture: FixtureAPI) => void;
  canEdit: boolean; // 🔒 Nueva prop para permisos
}

const PartidoRow: React.FC<{ partido: EncuentroAPI }> = ({ partido }) => {
  const parseResultado = (resultado: string): { score1: string; score2: string } => {
    if (!resultado || resultado.trim() === "-") {
      return { score1: "-", score2: "-" };
    }
    const scores = resultado.split('-');
    if (scores.length === 2) {
      return { score1: scores[0].trim(), score2: scores[1].trim() };
    }
    return { score1: resultado, score2: "" };
  };

  const { score1, score2 } = parseResultado(partido?.resultado || "-");
  
  // Validar que los datos del partido existan
  if (!partido) {
    return <div className="partido-row">Error: Datos del partido no disponibles</div>;
  }

  return (
    <div className="partido-row" role="group" aria-label={`Partido jornada ${partido.jornada}`}>
      <span className="team-name team-left">{partido.club1?.nombre || 'Local'}</span>
      
      <div className="score-container" aria-hidden="false">
        <span className={`score score-left ${Number(score1) > Number(score2) ? 'winner' : ''}`}>
          {score1}
        </span>
        <span className="separator">{score2 ? ':' : 'vs'}</span>
        <span className={`score score-right ${Number(score2) > Number(score1) ? 'winner' : ''}`}>
          {score2}
        </span>
      </div>

      <span className="team-name team-right">{partido.club2?.nombre || 'Visitante'}</span>
    </div>
  );
};

const ListaFixture: React.FC<ListaFixtureProps> = ({ fixtures, onEdit, canEdit }) => {
  if (!fixtures || fixtures.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📅</div>
        <h3 className="empty-state-title">Sin Fixtures Registrados</h3>
        <p className="empty-state-subtitle">
          No hay fixtures registrados aún. Comienza registrando el primer fixture.
        </p>
      </div>
    );
  }

  return (
    <div className="lista-fixture-container">
      {fixtures.map((f) => (
        <article key={f.id} className="fixture-item-card">
          <header className="fixture-header">
            <div>
              <h3 className="fixture-title" style={{ margin: 0 }}>{f.fecha} — {f.lugar}</h3>
            </div>
            <div className="buttonContainer" style={{ display: 'flex', gap: 8 }}>
              {canEdit && <button className="btn-action" style={{ backgroundColor: '#1f3c88', color: '#ffffff' }} onClick={() => onEdit(f)}>Editar</button>}
            </div>
          </header>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {f.partidos && f.partidos.length > 0 ? (
              f.partidos.map(p => (
                <li key={p.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                  <PartidoRow partido={p} />
                </li>
              ))
            ) : (
              <li style={{ padding: '8px 0', color: '#999', fontStyle: 'italic' }}>
                No hay partidos registrados para este fixture
              </li>
            )}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default ListaFixture;