import React from 'react';
import styles from '@styles/Footer.module.css';
import ExtLink from '@components/ExtLink';
import GithubSVG from '@components/SVGIcons/github.svg';
import LinkedinSVG from '@components/SVGIcons/linkedin.svg';

export default function Footer({homeData} : {homeData: {copyright : string}})
{
    return (
        <>
            <footer>
                <aside className={styles.ext_link}>
                    <ExtLink href='https://github.com/bengeendokter' aria-label="GitHub" >
                        <GithubSVG />
                    </ExtLink>
                    <ExtLink href='https://www.linkedin.com/in/bengeendokter' aria-label="LinkedIn" >
                        <LinkedinSVG />
                    </ExtLink>
                </aside>
                <small className={styles.copy}>
                    Copyright &copy; {new Date().getFullYear()}, Ben Arts<br /> {homeData.copyright}
                </small>
            </footer>
        </>
    );
};