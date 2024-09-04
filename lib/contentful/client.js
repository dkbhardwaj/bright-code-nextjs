
import { createClient } from 'contentful'

export const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
}) 

async function getPage(params) {
    const query = {
      limit: 1,
      include: 10,
      locale: params.locale,
      'fields.slug': params.slug,
      content_type: 'blogs',
      'fields.content.sys.contentType.sys.id': params.pageContentType,
    };
    const { items: [page] } = await client.getEntries(query);
    return page || null;
  }