import React from 'react';
import Tag from '@components/Tag';
import styles from '@styles/ProjectPreview.module.css';
import  GithubSVG from '@components/SVGIcons/github.svg';
import ExtLink from '@components/ExtLink';

interface Props {title : string, tags : Array<string>, beschrijving : string, imgSrc : string, imgAlt : string, github : string};

export default function ProjectPreview({title, tags, beschrijving, imgSrc, imgAlt, github, ...rest} : Props)
{
    return (
        <div className={styles["main"]}>
            <div className={styles["project-preview"]}>
                <img src={imgSrc} alt={imgAlt} width="460" height="329" className={styles["project-image"]} />
                <div className="project-info">
                    <p className={styles["project-title"]}>{title}</p>
                    <div className={styles["tags"]}>
                        {github && <ExtLink href={github}  aria-label="GitHub" ><GithubSVG/></ExtLink>}
                              {tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}</div>
                    <p className={styles["project-beschrijving"]}>{beschrijving}</p>
                </div>
            </div>
        </div>
    );
};