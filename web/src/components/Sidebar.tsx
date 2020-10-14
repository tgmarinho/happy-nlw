import React from 'react'
import { FiArrowLeft } from 'react-icons/fi';
import {  useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();

  return (
    <aside className="app-sidebar">
      <img src="/images/map-marker.svg" alt="Happy" />

      <footer>
        <button type="button" onClick={router.back}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}