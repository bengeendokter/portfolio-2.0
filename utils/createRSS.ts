import fs from "fs";
import {Feed} from "feed";
import Project from '@ts/Project'

export default function createRSS(projecten : Array<Project>, locales : Array<string>)
{
  const siteURL = process.env.NODE_ENV == 'development'
  ? "http://localhost:3000"
  : "https://portfolio-tinacms.netlify.app";
  const date = new Date();
  const author = {
    name: "Ben",
    link: "https://twitter.com/bengeendokter",
  };

  locales.forEach(locale => {



  const feed = new Feed({
    title: "Tina PWA",
    description: "Tina PWA",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Ben Arts`,
    updated: date, // today's date
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/${locale}/feed.xml`,  // xml format
      json: `${siteURL}/rss/${locale}/feed.json`,// json fromat
    },
    author,
  });

  projecten.filter((post) => post._sys.breadcrumbs[0] == locale).forEach((post) =>
  {
    const url = `${siteURL}/${post._sys.breadcrumbs[0]}/demo/blog/${post._sys.breadcrumbs[1]}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content: post.description,
      author: [author],
      contributor: [author],
      date: new Date(),
    });
  });

  fs.mkdirSync(`./public/rss/${locale}`, {recursive: true});
  fs.writeFileSync(`./public/rss/${locale}/feed.xml`, feed.rss2());
  fs.writeFileSync(`./public/rss/${locale}/feed.json`, feed.json1());

});
}