import React from "react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../components/map"), {
  ssr: false,
});

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src="/images/map-marker.svg" alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Brasília</strong>
          <span>Distrito Federal</span>
        </footer>
      </aside>

      <MapWithNoSSR />

      <Link href="">
        <a className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </a>
      </Link>
    </div>
  );
};

export default OrphanagesMap;
