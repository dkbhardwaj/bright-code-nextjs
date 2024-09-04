import {client} from './client';

// Fetch entry by slug
export async function fetchEntryBySlug(slug, contentType) {
  try {
    const response = await client.getEntries({
      content_type: contentType,  // Replace with your content type ID
      'fields.alias': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      throw new Error('Entry not found');
    }

    return response.items[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}