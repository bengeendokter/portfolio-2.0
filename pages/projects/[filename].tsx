// THIS FILE HAS BEEN GENERATED WITH THE TINA CLI.
// This is a demo file once you have tina setup feel free to delete this file

import { staticRequest, gql } from "tinacms";
import Head from "next/head";
import { createGlobalStyle } from "styled-components";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Path from "@ts/Path"

const query = gql`
    query ProjectPostQuery($relativePath: String!) {
      projects(relativePath: $relativePath) {
        title
        body
      }
    }
  `

// Styles for markdown
const GlobalStyle = createGlobalStyle`
  h1,h2,h3,h4,h5 {
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
  }
  blockquote {
    background-color: rgb(209,250,229);
  }
  h1 {
    font-size: 45px;
  }
  h2 {
    font-size: 35px;
  }
  h3 {
    font-size: 25px;
  }
  h4 {
    font-size: 22px;
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
      <ContentSection
        content={data.projects.body}
      ></ContentSection>
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

const PageSection = (props: { heading: string, content: string }) =>
{
  return (
    <>
      <h2>{props.heading}</h2>
      <p>{props.content}</p>
    </>
  )
}

const components = {
  PageSection: PageSection,
}

const ContentSection = ({ content }: { content: any }) =>
{
  return (<>
    <TinaMarkdown components={components} content={content} />
    <GlobalStyle /></>
  );
};

