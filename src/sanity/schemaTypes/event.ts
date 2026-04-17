export const event = {
  name: 'event',
  title: 'Events & Seminars',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'eventDate',
      title: 'Date and Time',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location / Platform',
      type: 'string',
      description: 'e.g., Zoom Online, or Lokayan Kalyan Center',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isFeatured',
      title: 'Featured Event?',
      type: 'boolean',
      description: 'Turn this on to highlight this event at the top of the page.',
      initialValue: false,
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'recordingUrl',
      title: 'Recording / YouTube URL (For Past Events)',
      type: 'url',
      description: 'If the event is over, paste the YouTube link here so students can watch it.',
    },
  ],
};