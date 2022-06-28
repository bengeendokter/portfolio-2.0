import { staticRequest, gql } from "tinacms";
import ExtLink from '@components/ExtLink';
import CV from '@components/CV';
import ProjectPreview from '@components/ProjectPreview';
import styles from '@styles/Home.module.css';
import GithubSVG from '@components/SVGIcons/github.svg';
import createRSS from '@utils/createRSS';
import ProjectNode from '@ts/ProjectNode'
import { useTina } from "tinacms/dist/edit-state";
import Project from '@ts/Project';



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

export default function Home(props: { variables: any, data: any, locale : string })
{
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  const projects: Array<ProjectNode> = data.projectsConnection.edges
  .map(({ node }: { node: ProjectNode }) => node)
  .filter((project : ProjectNode) => project._sys.breadcrumbs[0] == props.locale);

  console.log(projects)
  console.log(props.locale)


  return (
    <>
      <header>
        <a className={styles.skip_nav} href="#main-content">Navigatie overslaan</a>
        <nav>
          <ul>
            <li><a href="#projecten">Projecten</a></li>
            <li><a href="#CV">CV</a></li>
          </ul>
        </nav>
      </header>
      <main id='main-content'>
        <section className={styles.intro} aria-label='intro'>
          <img src="./assets/images/PF.jpg" width="300" height="300" alt="foto van mezelf" className={styles.PF} />
          <div className={styles.intro_info}>
            <h1 className={styles.naam}>Ben Arts</h1>
            <p className={styles.geendokter}>geen dokter</p>
            <p className={styles.intro_text}>Hallo ik ben Ben,
              een tweedejaars student bachelor toegepaste informatica en dit is mijn portfolio.
              Hieronder vinden jullie mijn projecten en CV.
            </p>
          </div>
        </section>
        <section aria-labelledby='projecten-title' id='projecten' className={styles.projecten}>
          <h2 id='projecten-title'>Projecten</h2>
          {projects.map((project, i: number) => <ProjectPreview key={i} {...project} />)}
        </section>
        <section aria-labelledby='CV-title' id='CV' className={styles.CV}>
          <h2 id='CV-title'>CV</h2>
          <CV />
          <a className={styles.download_button} href="./assets/documenten/BenArtsCV.pdf" download="BenArtsCV">Download CV</a>
        </section>
      </main>
      <footer>
        <aside>
          <ExtLink href='https://github.com/bengeendokter' aria-label="GitHub" >
            <GithubSVG />
          </ExtLink>
          {/* <ExtLink href='https://linkedin.com' aria-label="LinkedIn" ><LinkedinSVG className='svg-icon' /></ExtLink> */}
        </aside>
        <small>
          Copyright &copy; {new Date().getFullYear()}, Ben Arts<br /> Alle rechten voorbehouden
        </small>
      </footer>
    </>
  )
}

export const getStaticProps = async ({ locales, locale }: { locales: Array<string>, locale : string }) =>
{
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
      locale,
    },
  }
};