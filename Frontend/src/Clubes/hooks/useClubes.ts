// src/Clubes/hooks/useClubes.ts

import { useState, useEffect, useCallback } from "react";
import type { Club, ClubPayload, Localidad } from "../types";

const API_URL = "http://localhost:3001";

const LOCALIDADES_FIJAS: Localidad[] = [
  { id: 1, nombre: "Bialet Masse" },
  { id: 2, nombre: "Capilla del Monte" },
  { id: 3, nombre: "Cosquin (cabecera)" },
  { id: 4, nombre: "Huerta Grande" },
  { id: 5, nombre: "La Cumbre" },
  { id: 6, nombre: "La Falda" },
  { id: 7, nombre: "Los Cocos" },
  { id: 8, nombre: "San Antonio de Arredondo" },
  { id: 9, nombre: "San Esteban" },
  { id: 10, nombre: "Santa Maria" },
  { id: 11, nombre: "Tanti" },
  { id: 12, nombre: "Valle Hermoso" },
  { id: 13, nombre: "Villa Carlos Paz" },
  { id: 14, nombre: "Villa Giardino" },
  { id: 15, nombre: "Villa Icho Cruz" },
  { id: 16, nombre: "Villa Santa Cruz del Lago" },
  { id: 17, nombre: "Cabalango" },
  { id: 18, nombre: "Casa Grande" },
  { id: 19, nombre: "Charbonier" },
  { id: 20, nombre: "Cuesta Blanca" },
  { id: 21, nombre: "Estancia Vieja" },
  { id: 22, nombre: "Mayu Sumaj" },
  { id: 23, nombre: "San Roque" },
  { id: 24, nombre: "Tala Huasi" },
  { id: 25, nombre: "Villa Parque Siquiman" },
  { id: 26, nombre: "Malagueño" },
  { id: 27, nombre: "Cordoba Capital" },
  { id: 28, nombre: "Villa Saldan" },
];

export const useClubes = () => {
  const [clubes, setClubes] = useState<Club[]>([]);
  const [localidades] = useState<Localidad[]>(LOCALIDADES_FIJAS);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar clubes - MEMOIZADO
  const fetchClubes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/clubes`);
      const data = await res.json();
      setClubes(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError("No se pudieron cargar los clubes.");
      setClubes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar un club por ID - MEMOIZADO
  const fetchClubById = useCallback(async (id: number): Promise<Club | null> => {
    try {
      const res = await fetch(`${API_URL}/clubes/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }, []);

  // Crear club
  const crearClub = async (payload: ClubPayload): Promise<Club | null> => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/clubes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al crear club");
      const nuevoClub = await res.json();
      await fetchClubes(); // Recargar lista
      setError("");
      return nuevoClub;
    } catch (err) {
      setError("No se pudo crear el club.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar club
  const actualizarClub = async (
    id: number,
    payload: ClubPayload
  ): Promise<Club | null> => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/clubes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al actualizar club");
      const clubActualizado = await res.json();
      setClubes((prev) =>
        prev.map((c) => (c.id === id ? clubActualizado : c))
      );
      setError("");
      return clubActualizado;
    } catch (err) {
      setError("No se pudo actualizar el club.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar club (soft delete - activo: false)
  const eliminarClub = async (id: number): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/clubes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar club");
      setClubes((prev) => prev.filter((c) => c.id !== id));
      setError("");
      return true;
    } catch (err) {
      setError("No se pudo eliminar el club.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Manejo de subida de archivos
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ): string | null => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setError("Archivo inválido (máx 5MB, debe ser imagen)");
      return null;
    }

    let base64: string | null = null;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        base64 = reader.result;
      }
    };
    reader.readAsDataURL(file);
    return base64;
  };

  useEffect(() => {
    fetchClubes();
  }, []);

  return {
    clubes,
    localidades,
    error,
    loading,
    fetchClubes,
    fetchClubById,
    crearClub,
    actualizarClub,
    eliminarClub,
    handleFileUpload,
    setError,
  };
};
