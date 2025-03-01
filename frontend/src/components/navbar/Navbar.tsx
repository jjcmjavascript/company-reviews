"use client";

import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import styles from './navbar.module.css';

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header className={styles["navbar-header"]}>
      <div className="logo" style={{ color: 'white', fontSize: '20px' }}>
        Mi Aplicación
      </div>
      <Menu className={styles["navbar-menu"]} mode="horizontal" items={[
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