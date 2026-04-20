import { defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true, 
      },
    }),
    defineField({
      name: 'founderImage',
      title: 'Founder Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})