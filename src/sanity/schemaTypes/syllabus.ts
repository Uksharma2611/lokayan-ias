export const syllabus = {
  name: "syllabus",
  title: "Course Syllabus PDFs",
  type: "document",
  fields: [
    {
      name: "courseName",
      title: "Course Name",
      type: "string",
      description: "e.g., UPSC or MPSC",
    },
    {
      name: "courseId",
      title: "Course ID",
      type: "string",
      description: "MUST BE EXACTLY: UPSC or MPSC (uppercase)",
    },
    {
      name: "pdfFile",
      title: "Syllabus PDF File",
      type: "file",
      options: {
        accept: ".pdf", // Only allows PDF uploads
      },
    },
  ],
};
