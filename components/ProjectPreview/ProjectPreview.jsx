import React from 'react';
import Tag from '../Tag';
import ProjectPreviewCSS from './ProjectPreview.module.css';
import  GithubSVG from '@components/SVGIcons/github.svg';
import ExtLink from '@components/ExtLink';

export default function ProjectPreview({title, tags, beschrijving, imgSrc, imgAlt, github, ...rest})
{
    return (
        <div className={ProjectPreviewCSS["main"]}>
            <div className={ProjectPreviewCSS["project-preview"]}>
                <img src={imgSrc} alt={imgAlt} width="460" height="329" className={ProjectPreviewCSS["project-image"]} />
                <div className="project-info">
                    <p className={ProjectPreviewCSS["project-title"]}>{title}</p>
                    <div className={ProjectPreviewCSS["tags"]}>
                        {github && <ExtLink href={github}  aria-label="GitHub" ><GithubSVG/></ExtLink>}
                              {tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}</div>
                    <p className={ProjectPreviewCSS["project-beschrijving"]}>{beschrijving}</p>
                </div>
            </div>
        </div>
    );
};