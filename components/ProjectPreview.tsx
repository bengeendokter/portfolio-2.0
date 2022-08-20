import React from 'react';
import Tag from '@components/Tag';
import styles from '@styles/ProjectPreview.module.css';
import Project from '@ts/Project';

export default function ProjectPreview({ title, tags, description, imgSrc, imgAlt, github, _sys, ...rest }: Project)
{
    return (
        <div className={styles["main"]}>
            <div className={styles["project-preview"]}>
                <img src={imgSrc} alt={imgAlt} width="460" height="329" className={styles["project-image"]} />
                <div className={styles["project-info"]}>
                    <p className={styles["project-title"]}>{title}</p>
                    <div className={styles["tags"]}>
                        {tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}</div>
                    <p className={styles["project-beschrijving"]}>{description}</p>
                    {/* TODO handel i18n */}
                    <a className={styles.read_more} href={`/en/projects/${_sys.breadcrumbs[1]}`}>Read more</a>
                </div>
            </div>
        </div>
    );
};