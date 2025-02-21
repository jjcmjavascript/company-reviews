"use client";

import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header>
      <div className="logo" style={{ color: 'white', fontSize: '20px' }}>
        Mi Aplicación
      </div>
      <Menu theme="dark" mode="horizontal" items={[
          { 
            key: '1', 
            label: <Link href="/">Inicio</Link> 
          },
          { 
            key: '2', 
            label: <Link href="/about">Acerca de</Link> 
          },
          { 
            key: '3', 
            label: <Link href="/contact">Contacto</Link> 
          },
        ]}
      />
    </Header>
  );
};

export default Navbar;