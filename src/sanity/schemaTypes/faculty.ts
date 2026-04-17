export const faculty = {
  name: 'faculty',
  title: 'Faculty Members',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'designation',
      title: 'Designation / Subject',
      type: 'string',
      description: 'e.g., Head of History, Expert in Indian Polity',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop the image perfectly in Sanity
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'General Studies', value: 'General Studies' },
          { title: 'Optional Subjects', value: 'Optional Subjects' },
          { title: 'Language & CSAT', value: 'Language & CSAT' },
          { title: 'Interview Panel', value: 'Interview Panel' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'exams',
      title: 'Exams Taught (Check all that apply)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'UPSC', value: 'UPSC' },
          { title: 'MPSC', value: 'MPSC' },
        ],
      },
    },
    {
      name: 'experience',
      title: 'Years of Experience',
      type: 'string',
      description: 'e.g., 12+ Years Exp.',
    },
    {
      name: 'credentials',
      title: 'Top Credential',
      type: 'string',
      description: 'e.g., Appeared for UPSC Interview 2018',
    },
    {
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'A 2-3 sentence description of their teaching style.',
    },
  ],
};