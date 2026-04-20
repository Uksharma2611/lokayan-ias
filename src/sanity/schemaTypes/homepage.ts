import { defineField, defineType } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'founder', title: 'Founder Section' },
    { name: 'courses', title: 'Course Thumbnails' }, // New Tab for organization
  ],
  fields: [
    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
    }),
    defineField({
      name: 'founderImage',
      title: 'Founder Image',
      type: 'image',
      group: 'founder',
      options: { hotspot: true },
    }),
    // --- NEW FIELDS FOR COURSE IMAGES ---
    defineField({
      name: 'upscThumbnail',
      title: 'UPSC Course Thumbnail',
      type: 'image',
      group: 'courses',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mpscThumbnail',
      title: 'MPSC Course Thumbnail',
      type: 'image',
      group: 'courses',
      options: { hotspot: true },
    }),
  ],
})