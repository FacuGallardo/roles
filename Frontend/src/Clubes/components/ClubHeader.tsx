// src/Clubes/components/ClubHeader.tsx

import React from "react";

interface ClubHeaderProps {
  title: string;
  subtitle?: string;
}

export const ClubHeader: React.FC<ClubHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="club-header">
      <div className="club-header-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};
