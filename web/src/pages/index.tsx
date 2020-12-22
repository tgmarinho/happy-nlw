import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";

import Link from "next/link";
import api from "@/services/api";

const Landing: React.FC = () => {
  // only for heroku starts
  useEffect(() => {
    api
      .get("orphanages")
      .then((response) =>
        console.log(
          `awake heroku - ${response.data.length} registers on database`
        )
      );
  }, []);

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="content-logo-location">
          <img src="/images/logo.svg" alt="Happy" />

          <div className="location">
            <strong>Dourados</strong>
            <span>Mato Grosso do Sul</span>
          </div>
        </div>

        <Link href="/login">
          <a className="acesso-restrito">Acesso restrito</a>
        </Link>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

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
