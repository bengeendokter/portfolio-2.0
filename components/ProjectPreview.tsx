import Tag from '@components/Tag';
import styles from '@styles/ProjectPreview.module.css';
import Project from '@ts/Project';
import Link from 'next/link';
import Image from 'next/future/image';

export default function ProjectPreview({project: { title, tags, description, imgSrc, imgAlt, github, _sys, ...rest }, homeData}: {project: Project, homeData: {read_more: string}})
{
    const loaderProp = ({ src, width, quality }: { src: string, width: number, quality?: number | undefined }) =>
    {
      return `${src}`;
    }

    return (
        <div className={styles.main}>
            <div className={styles.project_preview}>
                <Image loader={loaderProp} src={imgSrc} alt={imgAlt} width="460" height="329" className={styles.project_image} />
                <div className={styles.project_info}>
                    <p className={styles.project_title}>{title}</p>
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