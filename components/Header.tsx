import React from 'react';
import styles from '@styles/Header.module.css';
import Link from 'next/link';
import ColorSchemeSelector from '@components/ColorSchemeSelector';

export default function Header({ homeData }: { homeData: { skip_nav: string, projects_heading: string, cv_heading: string } })
{
  return (
    <>
      <a className={styles.skip_nav} href="#main-content">{homeData.skip_nav}</a>
      <nav className={styles.main_nav}>
        <ul>
          <li><Link href="/#projecten"><a>{homeData.projects_heading}</a></Link></li>
          <li><Link href="/#CV"><a>{homeData.cv_heading}</a></Link></li>
        </ul>
      </nav>
      <ColorSchemeSelector/>
    </>
  );
};