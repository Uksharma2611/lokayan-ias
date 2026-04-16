import { type SchemaTypeDefinition } from 'sanity'
import article from './article'
import { syllabus } from './syllabus' // 1. Import the new schema here

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, syllabus], // 2. Add it to the array here
}