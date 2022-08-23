import { gql } from "tinacms";
import Head from "next/head";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Path from "@ts/Path"
import NavHeader from '@components/NavHeader';
import Footer from '@components/Footer';
import Tag from '@components/Tag';
import PWABtn from "@components/PWABtn";
import ItchBtn from "@components/ItchBtn";
import GitHubBtn from "@components/GitHubBtn";
import styles from '@styles/Project.module.css';
import ExtLink from "@components/ExtLink";
import { client } from '../../.tina/__generated__/client';
import { Children } from "react";

const query = gql`
    query ProjectPostQuery($relativePath: String!) {
      projects(relativePath: $relativePath) {
        title
        body
        tags
      }
    }
  `

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
  }
}`

const BlogPage = (props: { variables: any, data: any, homeData: any}) =>
{
  // const { data } = useTina({
  //   query,
  //   variables: props.variables,
  //   data: props.data,
  // });

  // const {pages: homeData} = props.homeData;
  const data = {projects: {
    title: "",
    body: "",
    tags: [],
  }}

  const homeData = {
    skip_nav: "",
    projects_heading: "",
    cv_heading: "",
    copyright: "",

  };

  return (
    <>
      <Head>
        <title>{data.projects.title}</title>
      </Head>
      <header>
        <NavHeader homeData={homeData}></NavHeader>
      </header>
      <main id='main-content' className={styles.main}>
        <h1>{data.projects.title}</h1>
        <div className={styles.tags}>
          {data.projects.tags.map((tag: string, i: number) => <Tag key={i}>{tag}</Tag>)}
        </div>
        <ContentSection
          content={data.projects.body}
        ></ContentSection>
      </main>
      <Footer homeData={homeData}></Footer>
    </>
  );
};

export const getStaticProps = async ({ params, locale }: Path) =>
{
  // home content ophalen
  // const homeVariables = { relativePath: `${locale}/home.md` }
  // let homeData: any = {}
  // try
  // {
  //   homeData = await client.request({
  //     query: homeQuery,
  //     variables: homeVariables,
  //   })
  // } catch {
  //   // swallow errors related to document creation
  // }

  // const variables = { relativePath: `${locale}/${params.filename}.md` }
  // let data: any = {}
  // try
  // {
  //   data = await client.request({
  //     query,
  //     variables,
  //   })
  // } catch {
  //   // swallow errors related to document creation
  // }

  return {
    props: {
      variables: {},
      data: {},
      homeData: {},
    },
  }
};

export const getStaticPaths = async () =>
{
  const postsListData: any = (await client.request({
    query: gql`
        query GetProjectsList {
          projectsConnection {
            edges {
              node {
                ...on Document {
                  _sys {
                    breadcrumbs
                  }
                }
              }
            }
          }
        }
      `,
  }));

  const paths: Array<Path> = [];
  const projectsResponse = await client.queries.projectsConnection();
  projectsResponse.data.projectsConnection.edges!.forEach((post) => 
  {
        // ensure a `path` is created for each `locale`
        paths.push({
          params: { filename: post!.node!._sys.breadcrumbs[1] },
          locale: post!.node!._sys.breadcrumbs[0],
        });
  });

  return {
    paths,
    fallback: "blocking",
  }
};

export default BlogPage;

// Custom components for markdown files

const GitHubBtnComp = (props: { href: string}) =>
{
  return (
    <>
      <GitHubBtn href={props.href} />
    </>
  )
}

const ItchBtnComp = (props: { href: string}) =>
{
  return (
    <>
      <ItchBtn href={props.href} />
    </>
  )
}

const PWABtnComp = (props: { href: string }) =>
{
  return (
    <>
      <PWABtn href={props.href} />
    </>
  )
}

const ExtLinkComp = (props: {url : string, children: Element} | any) =>
{
  return (
    <>
     <ExtLink href={props.url} >{props.children}</ExtLink>
    </>
  )
}

const components = {
  GitHubBtn: GitHubBtnComp,
  ItchBtn: ItchBtnComp,
  PWABtn: PWABtnComp,
  a: ExtLinkComp,
}

const ContentSection = ({ content }: { content: any }) =>
{
  return (<>
    <TinaMarkdown components={components} content={content} />
  </>
  );
};

