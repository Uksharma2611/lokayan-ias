export const resource = {
  name: 'resource',
  title: 'Study Resources',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Document Title',
      type: 'string',
      description: 'e.g., UPSC Prelims 2023 GS Paper 1',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'exam',
      title: 'Target Examination',
      type: 'string',
      options: {
        list: [
          { title: 'UPSC Civil Services', value: 'UPSC' },
          { title: 'MPSC State Services', value: 'MPSC' },
        ],
        layout: 'radio', 
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Previous Year Papers', value: 'Previous Year Papers' },
          { title: 'Mock Tests', value: 'Mock Tests' },
          { title: "Toppers' Notes", value: "Toppers' Notes" },
          { title: 'Current Affairs', value: 'Current Affairs' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'displayDate',
      title: 'Display Date',
      type: 'string',
      description: 'e.g., May 2023 or Jan 2024',
    },
    {
      name: 'pdfFile',
      title: 'Upload PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

