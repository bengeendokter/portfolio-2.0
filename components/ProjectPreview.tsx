import Tag from '@components/Tag';
import styles from '@styles/ProjectPreview.module.css';
import Project from '@ts/Project';
import Link from 'next/link';
import Image from 'next/future/image';

export default function ProjectPreview({ project: { title, tags, description, imgSrc, imgAlt, github, _sys, ...rest }, homeData }: { project: Project, homeData: { read_more: string } })
{
    return (
        <div className={styles.main}>
            <div className={styles.project_preview}>
                <div className={styles.project_image}>
                    <Image
                        src={imgSrc}
                        alt={imgAlt}
                        fill
                    />
                </div>
                <div className={styles.project_info}>
                    <h3 className={styles.project_title}>{title}</h3>
                    <div className={styles.tags}>
                        {tags.map((tag, i) => <Tag key={i}>{tag}</Tag>)}</div>
                    <p className={styles.project_beschrijving}>{description}</p>
                    <Link href={`/projects/${_sys.breadcrumbs[1]}`}>
                        <a className={styles.read_more} >{homeData.read_more}</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};