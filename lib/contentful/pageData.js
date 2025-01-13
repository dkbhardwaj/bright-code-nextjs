import {getClient} from './client';

// Fetch entry by slug
export async function fetchEntryBySlug(slug, contentType,isPreview) {
 
  let  currentClient = getClient(isPreview);
  console.log(contentType, slug)
  try {
    const response = await currentClient.getEntries({
      content_type: contentType,  
      'fields.alias': slug,
      limit: 1,
      include: 3
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