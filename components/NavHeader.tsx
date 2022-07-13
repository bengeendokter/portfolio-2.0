import React from 'react';
import styles from '@styles/NavHeader.module.css';

export default function NavHeader({homeData} : {homeData: {skip_nav : string, projects_heading : string, cv_heading : string}})
{
    return (
        <>
        <a className={styles.skip_nav} href="#main-content">{homeData.skip_nav}</a>
        <nav className={styles.main_nav}>
          <ul>
            <li><a href="#projecten">{homeData.projects_heading}</a></li>
            <li><a href="#CV">{homeData.cv_heading}</a></li>
          </ul>
        </nav>
        </>
    );
};