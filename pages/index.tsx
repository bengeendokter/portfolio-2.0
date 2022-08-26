import { client } from '../.tina/__generated__/client';
import CV from '@components/CV';
import ProjectPreview from '@components/ProjectPreview';
import NavHeader from '@components/NavHeader';
import Footer from '@components/Footer';
import styles from '@styles/Home.module.css';
import createRSS from '@utils/createRSS';
import ProjectNode from '@ts/ProjectNode';
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Image from 'next/future/image';

export default function Home(props: { variables: any, data: any, query: any, locale: string, projects: any })
{
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const homeData = data.pages

  const projects: Array<ProjectNode> = props.projects.filter((project: ProjectNode) => project._sys.breadcrumbs[0] == props.locale);

  return (
    <>
      <header>
        <NavHeader homeData={homeData}></NavHeader>
      </header>
      <main id='main-content'>
        <section className={styles.intro} aria-label='intro'>
          <div className={styles.PF}>
            <Image
              src={homeData.pf}
              alt={homeData.pfImgAlt}
              fill
              priority
            />
          </div>
          <div className={styles.intro_info}>
            <h1 className={styles.naam}>Ben Arts</h1>
            <p className={styles.geendokter}>{homeData.subtitle}</p>
            <div className={styles.intro_text}><TinaMarkdown content={homeData.intro} />
            </div>

          </div>
        </section>
        <section aria-labelledby='projecten-title' id='projecten' className={styles.projecten}>
          <h2 id='projecten-title'>{homeData.projects_heading}</h2>
          {projects.map((project, i: number) => <ProjectPreview key={i} project={project} homeData={homeData} />)}
        </section>
        <section aria-labelledby='CV-title' id='CV' className={styles.CV}>
          <h2 id='CV-title'>{homeData.cv_heading}</h2>
          <CV />
          <a className={styles.download_button} href="./assets/documents/BenArtsCV.pdf" download="BenArtsCV">Download CV</a>
        </section>
      </main>
      <Footer homeData={homeData}></Footer>
    </>
  )
}

export const getStaticProps = async ({ locales, locale }: { locales: Array<string>, locale: string }) =>
{
  // home content ophalen
  const homeResponse = await client.queries.pages({ relativePath: `${locale}/home.md` })

  // posts ophalen
  const projectsResponse = await client.queries.projectsConnection();

  const projects: Array<ProjectNode> | any = projectsResponse.data.projectsConnection.edges!.map((post) => { return post!.node! });
  createRSS(projects, locales);

  return {
    props: {
      variables: homeResponse.variables,
      data: homeResponse.data,
      query: homeResponse.query,
      projects,
      locale,
    },
  }
};
