
import { defineSchema, defineConfig } from "tinacms";

const schema = defineSchema({
  collections: [
    {
      label: "Pages",
      name: "pages",
      path: "content/pages",
      fields: [
        {
          type: "string",
          label: "Subtitle",
          name: "subtitle",
        },
        {
          type: "string",
          label: "Skip Nav",
          name: "skip_nav",
        },
        {
          type: "string",
          label: "Projects heading",
          name: "projects_heading",
        },
        {
          type: "string",
          label: "CV heading",
          name: "cv_heading",
        },
        {
          type: "string",
          label: "Dowload CV label",
          name: "dowload_cv_label",
        },
        {
          type: "string",
          label: "Copyright",
          name: "copyright",
        },
        {
          type: "string",
          label: "Itch.io Button",
          name: "itch_btn",
        },
        {
          type: "string",
          label: "Read more",
          name: "read_more",
        },
        {
          type: "rich-text",
          label: "Intro",
          name: "intro",
          isBody: true,
        }
      ],
    },
    {
      label: "Project Posts",
      name: "projects",
      path: "content/projects",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Tags",
          name: "tags",
          list: true,
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
        {
          type: "string",
          label: "Imgage Alt",
          name: "imgAlt",
        },
        {
          type: 'image',
          label: "Imgage Src",
          name: "imgSrc",
        },
        {
          type: "string",
          label: "Github",
          name: "github",
        },
        {
          type: "rich-text",
          label: "Project Post Body",
          name: "body",
          isBody: true,
          templates: [
            {
              name: "GitHubBtn",
              label: "Github Button",
              fields: [
                {
                  type: "string",
                  name: "href",
                  label: "Hyperlink",
                }
              ],
            },
            {
              name: "ItchBtn",
              label: "itch.io Button",
              fields: [
                {
                  type: "string",
                  name: "href",
                  label: "Hyperlink",
                }
              ],
            },
            {
              name: "PWABtn",
              label: "PWA Button",
              fields: [
                {
                  type: "string",
                  name: "href",
                  label: "Hyperlink",
                }
              ],
            },
            {
              name: "GooglePlayBtn",
              label: "Google Play Button",
              fields: [
                {
                  type: "string",
                  name: "href",
                  label: "Hyperlink",
                }
              ],
            },
          ]
        },
      ],
    },
  ],
});

export default schema

// Your tina config
// ==============
const branch = 'main'
// When working locally, hit our local filesystem.
// On a Vercel deployment, hit the Tina Cloud API
const clientId = '0b1e9791-3f85-464e-a469-98eeb3c114fe'

const apiURL =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${clientId}/github/${branch}`

export const tinaConfig = defineConfig({
  apiURL,
  mediaStore: async () =>
  {
    // Load media store dynamically so it only loads in edit mode
    const pack = await import("next-tinacms-cloudinary");
    return pack.TinaCloudCloudinaryMediaStore;
  },
  schema,
  cmsCallback: (cms) =>
  {
    //  add your CMS callback code here (if you want)

    // The Route Mapper
    /**
     * 1. Import `tinacms` and `RouteMappingPlugin`
     **/
    import("tinacms").then(({ RouteMappingPlugin }) =>
    {
      /**
       * 2. Define the `RouteMappingPlugin` see https://tina.io/docs/tinacms-context/#the-routemappingplugin for more details
       **/
      const RouteMapping = new RouteMappingPlugin((collection, document) =>
      {
        return undefined;
      });
      /**
       * 3. Add the `RouteMappingPlugin` to the `cms`.
       **/
      cms.plugins.add(RouteMapping);
    });

    return cms;
  },
});
