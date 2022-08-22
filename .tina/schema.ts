
import { defineSchema } from "tinacms";

const schema = defineSchema({
  config:
  {
    token: process.env.TINA_TOKEN!,
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
    branch: process.env.HEAD!,
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
