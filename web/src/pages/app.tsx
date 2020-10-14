import React, { useEffect, useState } from "react";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

import api from "@/services/api";

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/mapOrphanages"), {
  ssr: false,
});

export interface IOrphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src="/images/map-marker.svg" alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Dourados</strong>
          <span>Mato Grosso do Sul</span>
        </footer>
      </aside>

      <MapWithNoSSR orphanages={orphanages} />

      <Link href="/orphanages/create">
        <a className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </a>
      </Link>
    </div>
  );
};

export default OrphanagesMap;
