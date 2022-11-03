import ExtLink from "@components/ExtLink";
import Footer from "@components/Footer";
import GitHubBtn from "@components/GitHubBtn";
import Header from "@components/Header";
import ItchBtn from "@components/ItchBtn";
import PWABtn from "@components/PWABtn";
import ShareSVG from "@components/SVGIcons/share.svg";
import Tag from "@components/Tag";
import styles from "@styles/Project.module.css";
import Path from "@ts/Path";
import Image from "next/future/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { RWebShare } from "react-web-share";
import { CSSProperties } from "styled-components";
import { useTina } from "tinacms/dist/edit-state";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";

const BlogPage = (props: { variables: any, data: any, query: any, homeData: any }) =>
{
  const router = useRouter();

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const homeData = props.homeData;

  return (
    <>
      <Head>
        <title>{data.projects.title}</title>
        <meta property="og:title" content={data.projects.title} key="ogtitle" />
        <meta name="description" content={data.projects.description} />
        <meta property="og:description" content={data.projects.description} key="ogdescription" />
        <meta property="og:image" content={data.projects.imgSrc} key="ogimage" />
        <meta property="og:image:alt" content={data.projects.imgAlt} key="ogimagealt" />
      </Head>
      <header>
        <Header homeData={homeData}></Header>
      </header>
      <main id='main-content' className={styles.main}>
        <h1>{data.projects.title}</h1>
        <div className={styles.tags_share_container}>
          <div className={styles.tags}>
            {data.projects.tags.map((tag: string, i: number) => <Tag key={i}>{tag}</Tag>)}
          </div>
          <RWebShare data={
            {
              text: `${data.projects.description}`,
              url: `https://bengeendokter.be${router.locale !== router.defaultLocale ? "/" + router.locale : ""}${router.asPath}`,
              title: `${data.projects.title}`,
            }
          }>
            <button type="button" aria-label="Share">
              <ShareSVG />
            </button>
          </RWebShare>
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
  let projectResponse: { variables: any, data: any, query: any } | undefined;

  try
  {
    projectResponse = await client.queries.projects({ relativePath: `${locale}/${params.filename}.md` });
  }
  catch(err)
  {
    return { notFound: true };
  }


  return {
    props: {
      variables: projectResponse?.variables,
      data: projectResponse?.data,
      query: projectResponse?.query,
      homeData: homeResponse.data.pages,
    },
  };
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
  };
};

export default BlogPage;

// Custom components for markdown files

const GitHubBtnComp = (props: { href: string }) =>
{
  return (
    <>
      <GitHubBtn href={props.href} />
    </>
  );
};

const ItchBtnComp = (props: { href: string }) =>
{
  return (
    <>
      <ItchBtn href={props.href} />
    </>
  );
};

const PWABtnComp = (props: { href: string }) =>
{
  return (
    <>
      <PWABtn href={props.href} />
    </>
  );
};

const ExtLinkComp = (props: { url: string, children: Element } | any) =>
{
  return (
    <>
      <ExtLink href={props.url} >{props.children}</ExtLink>
    </>
  );
};

const ImgComp = (props: { url: string, alt?: string | undefined } | any) =>
{
  const container: CSSProperties =
  {
    position: "relative",
    width: "100%",
    aspectRatio: "4/3",
  };

  const img: CSSProperties =
  {
    objectFit: "cover",
    borderRadius: "7px",
  };

  return (
    <>
      <div style={container} >
        <Image
          src={props.url}
          alt={props.alt}
          style={img}
          fill
          priority
        />
      </div>
    </>
  );
};

const components = {
  GitHubBtn: GitHubBtnComp,
  ItchBtn: ItchBtnComp,
  PWABtn: PWABtnComp,
  a: ExtLinkComp,
  img: ImgComp,
};

const ContentSection = ({ content }: { content: any }) =>
{
  return (<>
    <TinaMarkdown components={components} content={content} />
  </>
  );
};

