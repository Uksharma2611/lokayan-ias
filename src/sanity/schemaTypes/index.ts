import { type SchemaTypeDefinition } from 'sanity'
import article from './article'
import { syllabus } from './syllabus' 
import { resource } from './resource'
import { faculty } from './faculty'
import { event } from './event'
import { homepage } from './homepage' // 
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, syllabus, resource, faculty, event, homepage], 
}