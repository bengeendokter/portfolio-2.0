// THIS FILE HAS BEEN GENERATED WITH THE TINA CLI.
// This is a demo file once you have tina setup feel free to delete this file

import { staticRequest, gql } from "tinacms";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Path from "@ts/Path"
import NavHeader from '@components/NavHeader';
import Footer from '@components/Footer';
import Tag from '@components/Tag';
import ExtLink from "@components/ExtLink";
import PWABtn from "@components/PWABtn";
import ItchBtn from "@components/ItchBtn";
import GitHubBtn from "@components/GitHubBtn";
import GooglePlayBtn from "@components/GooglePlayBtn";

const query = gql`
    query ProjectPostQuery($relativePath: String!) {
      projects(relativePath: $relativePath) {
        title
        body
        tags
      }
    }
  `

// Styles for markdown
const GlobalStyle = createGlobalStyle`
  h1,h2,h3 {
    margin-bottom: 0.6rem;
    margin-top: 0.7rem;
  }
  p
  {
    margin-top: 0rem;
    margin-bottom: 0rem;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.2rem;
  }
  h3 {
    font-size: 1.1rem;
  }
  main
  {
    display: flex;
    flex-direction: column;
    margin-inline: 0.5em;
  }
  .tags
  {
    margin-block: 0.5em;
  }
  ul {
    padding-left: 0;
  }
  li {
    list-style-type: none;
  }
  a {
    font-weight: bold;
    color: rgb(59,130,246);
    text-decoration: underline;
  }
  img
  {
    max-width: 100%;
  }
  `;

const BlogPage = (props: { variables: any, data: any }) =>
{
  const { data } = useTina({
    query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <Head>
        <title>{data.projects.title}</title>
      </Head>
      <header>
        {/* TODO remove hardcoded strings */}
        <NavHeader homeData={{skip_nav : "skip_nav", projects_heading : "Projects", cv_heading : "CV"}}></NavHeader>
      </header>
      <main id='main-content'>
        <h1>{data.projects.title}</h1>
        <PWABtn href={""}/>
        <br />
        <ItchBtn href={""}/>
        <br />
        <GitHubBtn href={""}/>
        <br />
        <GooglePlayBtn href={""}/>
        <div className="tags">
          {data.projects.tags.map((tag : string, i : number) => <Tag key={i}>{tag}</Tag>)}
        </div>
      <ContentSection
        content={data.projects.body}
      ></ContentSection>
      </main>
      {/* TODO remove hardcoded strings */}
      <Footer homeData={{
        copyright: "Alle rechten voorbehouden"
      }}></Footer>
    </>
  );
};

export const getStaticProps = async ({ params, locale }: Path) =>
{
  const variables = { relativePath: `${locale}/${params.filename}.md` }
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

  return {
    props: {
      variables,
      data,
    },
  }
};

export const getStaticPaths = async () =>
{
  const postsListData: any = (await staticRequest({
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

  postsListData.projectsConnection.edges.map((post: any) =>
  {
    // ensure a `path` is created for each `locale`
    paths.push({
      params: { filename: post.node._sys.breadcrumbs[1] },
      locale: post.node._sys.breadcrumbs[0],
    });
  });


  return {
    paths,
    fallback: "blocking",
  }
};

export default BlogPage;

const BtnGithub = (props: { href: string }) =>
{
  return (
    <>
    <ExtLink href={props.href} >linkgit</ExtLink>
    </>
  )
}

const components = {
  BtnGithub: BtnGithub,
}

const ContentSection = ({ content }: { content: any }) =>
{
  return (<>
    <TinaMarkdown components={components} content={content} />
    <GlobalStyle /></>
  );
};

