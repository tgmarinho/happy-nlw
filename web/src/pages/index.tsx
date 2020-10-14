import React from "react";
import { FiArrowRight } from "react-icons/fi";

import Link from "next/link";

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src="/images/logo.svg" alt="Happy" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Dourados</strong>
          <span>Mato Grosso do Sul</span>
        </div>

        <Link href="/app">
          <a className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
