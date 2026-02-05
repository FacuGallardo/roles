import React from "react";

type Noticia = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  imagenUrl?: string;
};

type Props = {
  noticias: Noticia[];
  onEliminar: (id: number) => void;
  onEditar: (noticia: Noticia) => void; 
};

// Estilos convertidos a objeto para su uso en línea
const styles = {
    listContainer: {
        maxHeight: '600px', 
        overflowY: 'auto',
        paddingRight: '0.5rem', 
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem', 
    },
    listItem: {
        padding: '1rem', 
        border: '1px solid #e5e7eb', 
        borderRadius: '0.75rem', 
        backgroundColor: '#fff', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', 
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        transition: 'box-shadow 0.2s ease',
    } as React.CSSProperties,
    contentArea: {
        display: 'flex',
        gap: '1rem', 
        alignItems: 'flex-start',
        width: '100%',
        paddingRight: '1rem', 
    } as React.CSSProperties,
    image: {
        width: 'clamp(80px, 20vw, 120px)', 
        height: 'clamp(80px, 20vw, 120px)', 
        objectFit: 'cover',
        borderRadius: '0.5rem', 
        flexShrink: 0,
    } as React.CSSProperties,
    noImage: {
        width: 'clamp(80px, 20vw, 120px)', 
        height: 'clamp(80px, 20vw, 120px)', 
        backgroundColor: '#e5e7eb', 
        borderRadius: '0.5rem', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#6b7280', 
        fontSize: '0.75rem', 
    } as React.CSSProperties,
    textDetails: {
        flexGrow: 1,
    } as React.CSSProperties,
    title: {
        fontWeight: 800, 
        color: '#111827', 
        fontSize: '1.125rem', 
        lineHeight: 1.375,
    } as React.CSSProperties,
    date: {
        fontSize: '0.75rem', 
        color: '#4f46e5', 
        fontWeight: 500, 
        marginTop: '0.125rem', 
    } as React.CSSProperties,
    content: {
        fontSize: '0.875rem', 
        color: '#4b5563', 
        marginTop: '0.25rem', 
        display: '-webkit-box',
        WebkitLineClamp: 2, 
        WebkitBoxOrient: 'vertical' as any,
        overflow: 'hidden',
    } as React.CSSProperties,
    buttonGroup: { // Estilo para agrupar botones
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0.5rem',
        alignItems: 'flex-end',
        flexShrink: 0,
    } as React.CSSProperties,
    editButton: { // 🚨 COLOR ACTUALIZADO A #1f3c88
        padding: '0.25rem 0.75rem', 
        backgroundColor: '#1f3c88', // Azul Fuerte
        color: 'white',
        borderRadius: '0.5rem', 
        transition: 'background-color 0.15s ease',
        cursor: 'pointer',
        border: 'none',
        fontWeight: '600',
    } as React.CSSProperties,
    deleteButton: {
        padding: '0.25rem 0.75rem', 
        backgroundColor: '#dc2626', // red-600 (rojo de eliminación)
        color: 'white',
        borderRadius: '0.5rem', 
        transition: 'background-color 0.15s ease',
        cursor: 'pointer',
        border: 'none',
        fontWeight: '600',
    } as React.CSSProperties
};


const NoticiasLista: React.FC<Props> = ({ noticias, onEliminar, onEditar }) => {
  if (noticias.length === 0) return <p style={{ color: '#6b7280', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>No hay noticias cargadas. Utiliza el formulario para publicar una.</p>;

  const noticiasOrdenadas = [...noticias].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  return (
    <div className="noticias-lista-scroll" style={styles.listContainer as React.CSSProperties}>
      {noticiasOrdenadas.map((n) => (
        <div 
            key={n.id} 
            style={styles.listItem}
        >
          <div style={styles.contentArea}>
                {n.imagenUrl ? (
                    <img loading="lazy" src={n.imagenUrl} alt={n.titulo} 
                        style={styles.image}
                    />
                ) : (
                    <div style={styles.noImage}>
                        No Img
                    </div>
                )}
                <div style={styles.textDetails}>
                    <h4 style={styles.title}>{n.titulo}</h4>
                    <p style={styles.date}>
                        {new Date(n.fecha).toLocaleDateString()}
                    </p>
                    <p style={styles.content}>{n.contenido}</p>
                </div>
          </div>
          <div style={styles.buttonGroup}> {/* Agrupar botones */}
             <button
                onClick={() => onEditar(n)}
                style={styles.editButton}
                title="Editar Noticia"
             >
                 Editar
             </button>
             <button
                onClick={() => onEliminar(n.id)}
                style={styles.deleteButton}
                title="Eliminar Noticia"
             >
                 Eliminar
             </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticiasLista;



