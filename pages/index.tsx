import { staticRequest, gql } from "tinacms";
import CV from '@components/CV';
import ProjectPreview from '@components/ProjectPreview';
import NavHeader from '@components/NavHeader';
import Footer from '@components/Footer';
import styles from '@styles/Home.module.css';
import createRSS from '@utils/createRSS';
import ProjectNode from '@ts/ProjectNode';
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text'

const homeQuery = gql`
  query HomePageQuery($relativePath: String!) {
  pages(relativePath: $relativePath) {
    subtitle
    intro
    skip_nav
    projects_heading
    cv_heading
    dowload_cv_label
    copyright
    read_more
  }
}`

const query = gql`{
  projectsConnection{
	edges
    {
      node
      {
				title
        tags
        description
        imgAlt
        imgSrc
        github
        _sys
        {
          breadcrumbs
        }
    }

  }
}}`

export default function Home(props: { variables: any, data: any, locale: string, homeData: any, homeVariables: any })
{
  const data = props.data;

  const { data: {pages: homeData} } = useTina({
    query: homeQuery,
    variables: props.homeVariables,
    data: props.homeData,
  });

  const projects: Array<ProjectNode> = data.projectsConnection.edges
    .map(({ node }: { node: ProjectNode }) => node)
    .filter((project: ProjectNode) => project._sys.breadcrumbs[0] == props.locale);


  return (
    <>
      <header>
        <NavHeader homeData={homeData}></NavHeader>
      </header>
      <main id='main-content'>
        <section className={styles.intro} aria-label='intro'>
          {/* TODO alt i18n */}
          <img src="./assets/images/PF.jpg" width="300" height="300" alt="foto van mezelf" className={styles.PF} />
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
  const homeVariables = { relativePath: `${locale}/home.md` }
  let homeData: any = {}
  try
  {
    homeData = await staticRequest({
      query: homeQuery,
      variables: homeVariables,
    })
  } catch {
    // swallow errors related to document creation
  }

  // posts ophalen
  const variables = {}
  let data: any = {}
  try
  {
    data = await staticRequest({
      query,
      variables,
    })
  } catch {
    // swallow errors related to document creation
  }

  const projects: Array<ProjectNode> = data.projectsConnection.edges.map(({ node }: { node: ProjectNode }) => node);
  createRSS(projects, locales);

  return {
    props: {
      variables,
      data,
      homeData,
      homeVariables,
      locale,
    },
  }
};