import { type SchemaTypeDefinition } from 'sanity'
import { author } from './author'
import { start } from './start'
import { playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, start, playlist],
}
