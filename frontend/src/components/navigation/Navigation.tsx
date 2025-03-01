
import Navbar from 'components/navbar/Navbar';
import styles from './navigation.module.css';
import { NavigationProps } from './types/props/navigationProps';

export const Navigation = ({ children }: NavigationProps) => {
  return (
    <div className={styles["navigation-root"]}>
      <Navbar />
      <main className={styles['navigation-main']}>
        {children}
      </main>
    </div>
  );
};
