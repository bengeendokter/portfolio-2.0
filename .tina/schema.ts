
import { defineSchema, defineConfig } from "tinacms";
import { client } from "./__generated__/client";

const schema = defineSchema({
  config:
  {
    token: process.env.HEAD == "main" ? process.env.TINA_TOKEN : process.env.TINA_TOKEN_DEV,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    branch: process.env.HEAD,
    media:
    {
      tina: {
        publicFolder: "public",
        mediaRoot: "assets/images"
      },
    }
  },
  collections: [
    {
      label: "Pages",
      name: "pages",
      path: "content/pages",
      format: "md",
      fields: [
        {
          type: "string",
          label: "Skip Nav",
          name: "skip_nav",
        },
        {
          name: "pf",
          type: "image",
          label: "Profile Picture",
        },
        {
          type: "string",
          label: "Image PF Alt",
          name: "pfImgAlt",
        },
        {
          type: "string",
          label: "Subtitle",
          name: "subtitle",
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
      format: "md",
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
          type: "image",
          label: "Imgage Src",
          name: "imgSrc",
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

export const tinaConfig = defineConfig({
  client,
  schema,
})

export default schema
