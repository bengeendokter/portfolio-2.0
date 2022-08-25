import React from 'react';
import styles from '@styles/CV.module.css';
import Image from 'next/future/image';
import img from "../public/assets/images/CV.png";

export default function CV()
{
    return (
        // <article className={CVCSS.main}>
        //     <section aria-label='naam'>
        //         <h3>Ben Arts</h3>
        //     </section>
        //     <section aria-labelledby='profiel-title'>
        //         <h4 id='profiel-title'>profiel</h4>
        //         <ul>
        //             <li>Developer</li>
        //             <li>Applicatieontwikkeling</li>
        //             <li>Webdevelopment</li>
        //         </ul>
        //         <p>Hallo ik ben Ben,
        //             een tweedejaars student bachelor toegepaste informatica.
        //             Zelf beschrijf ik me als
        //             een <strong>behulpzaam</strong> en <strong>bemiddelend</strong> persoon
        //             met <strong>oog voor detail</strong>.
        //             Ik ben op zoek naar mijn eerste job in <strong>(web)development</strong> waar
        //             ik mee kan nadenken over het oplossen van problemen en nog veel kan bijleren.  
        //         </p>
        //         <p><a href="mailto:ben.arts.mail@gmail.com">ben.arts.mail@gmail.com</a></p>
        //         <p><a href="tel:+32 400 00 00 00">+32 400 00 00 00</a></p>
        //         <p>27/03/2000</p>
        //         <p>Straatnaam 0, 0000 Stad</p>
        //         <p><ExtLink href="https://www.linkedin.com/">url LinkedIn-profiel</ExtLink></p>
        //     </section>
        //     <section aria-labelledby='opleiding-title'>
        //         <h4 id='opleiding-title'>opleiding</h4>
        //         <h5>Feb 2020 - Heden: Bachelor toegepaste informatica HOGENT</h5>
        //     </section>
        //     <section aria-labelledby='vaardigheden-title'>
        //         <h4 id='vaardigheden-title'>vaardigheden</h4>
        //         <h5>technische competenties</h5>
        //         <ul>
        //             <li>Java</li>
        //             <li>Python</li>
        //             <li>HTML</li>
        //             <li>CSS</li>
        //             <li>JavaScript</li>
        //             <li>React</li>
        //             <li>MySQL</li>
        //             <li>Godot game engine</li>
        //         </ul>
        //         <h5>talenkennis</h5>
        //         <ul>
        //             <li>Nederlands: Moedertaal</li>
        //             <li>Engels: Zeer goed</li>
        //             <li>Frans: Goed</li>
        //             <li>Portugees: Goed - vooral mondelinge en luistervaardigheden</li>
        //         </ul>
        //     </section>
        //     <section aria-labelledby='werkervaring-title'>
        //         <h4 id='werkervaring-title'>werkervaring</h4>
        //         <h5>Aug 2018: Jobstudent IT Aviapartner</h5>
        //         <p>Deployen van software op nieuwgekochte PC's en vervangen van oude PC's</p>
        //     </section>
        //     <section aria-labelledby='hobbys-title'>
        //         <h4 id='hobbys-title'>hobby's</h4>
        //         <ul>
        //             <li>Scouts</li>
        //             <li>Dansen (Ballroom & Latin)</li>
        //             <li>Video gaming</li>
        //         </ul>
        //     </section>
        // </article>
        <>
        <Image src={img} alt="CV van Ben Arts" className={styles.main} />
        </>
    );
};