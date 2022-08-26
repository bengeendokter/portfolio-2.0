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
import Image from 'next/future/image';

const BlogPage = (props: { variables: any, data: any, query: any, homeData: any }) =>
{
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const homeData = props.homeData;

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
  const homeResponse = await client.queries.pages({ relativePath: `${locale}/home.md` });

  // project content ophalen
  const projectResponse = await client.queries.projects({ relativePath: `${locale}/${params.filename}.md` });

  return {
    props: {
      variables: projectResponse.variables,
      data: projectResponse.data,
      query: projectResponse.query,
      homeData: homeResponse.data.pages,
    },
  }
};

export const getStaticPaths = async () =>
{
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

const GitHubBtnComp = (props: { href: string }) =>
{
  return (
    <>
      <GitHubBtn href={props.href} />
    </>
  )
}

const ItchBtnComp = (props: { href: string }) =>
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

const ExtLinkComp = (props: { url: string, children: Element } | any) =>
{
  return (
    <>
      <ExtLink href={props.url} >{props.children}</ExtLink>
    </>
  )
}

const ImgComp = (props: { url: string, alt?: string | undefined } | any) =>
{
  return (
    <>
      <Image
        src={props.url}
        width={460}
        height={329}
        alt={props.alt}
        priority
      />
    </>
  )
}

const components = {
  GitHubBtn: GitHubBtnComp,
  ItchBtn: ItchBtnComp,
  PWABtn: PWABtnComp,
  a: ExtLinkComp,
  img: ImgComp,
}

const ContentSection = ({ content }: { content: any }) =>
{
  return (<>
    <TinaMarkdown components={components} content={content} />
  </>
  );
};

