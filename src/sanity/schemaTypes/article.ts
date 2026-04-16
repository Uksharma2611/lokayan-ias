export default {
  name: "article",
  title: "Article / Blog",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Short Description (For Homepage Cards)",
      type: "text",
      rows: 3,
    },
    {
      name: "mainImage",
      title: "Main Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    },
    {
      name: "body",
      title: "Article Body",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
