import React from 'react';
import Tag from '@components/Tag';
import styles from '@styles/ProjectPreview.module.css';
import Project from '@ts/Project';

export default function ProjectPreview({project: { title, tags, description, imgSrc, imgAlt, github, _sys, ...rest }, homeData}: {project: Project, homeData: {read_more: string}})
{
    return (
        <div className={styles.main}>
            <div className={styles.project_preview}>
                <img src={imgSrc} alt={imgAlt} width="460" height="329" className={styles.project_image} />
                <div className={styles.project_info}>
                    <p className={styles.project_title}>{title}</p>
                    <div className={styles.tags}>
                        {tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}</div>
                    <p className={styles.project_beschrijving}>{description}</p>
                    {/* TODO handel i18n */}
                    <a className={styles.read_more} href={`/en/projects/${_sys.breadcrumbs[1]}`}>{homeData.read_more}</a>
                </div>
            </div>
        </div>
    );
};