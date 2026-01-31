import React from "react";

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

type Props = { partido: EncuentroAPI };

const PartidoItem: React.FC<Props> = ({ partido }) => (
  <li className="partido-item" style={{ marginBottom: 4, fontSize: '0.9em' }}>
    <strong>J{partido.jornada}</strong>
    <span className="club-names" style={{ marginLeft: 6 }}>
      <span className="club-local" style={{ fontWeight: 500 }}>{partido.club1?.nombre || 'Club Local ?'}</span>
      <span> vs </span>
      <span className="club-visit" style={{ fontWeight: 500 }}>{partido.club2?.nombre || 'Club Visit. ?'}</span>
    </span>
    <span className="resultado" style={{ color: "#1F3C88", marginLeft: 5 }}>({partido.resultado})</span>
    {partido.fecha && <span className="fecha" style={{ fontSize: '0.8em', color: '#777', marginLeft: 5 }}>[{partido.fecha}]</span>}
  </li>
);

export default PartidoItem;