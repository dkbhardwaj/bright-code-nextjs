import {client} from './client';

// Fetch entry by slug
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;


export async function getDataById(id) {

  try {
    if(id){
        const response = await client.getEntry(id);
        if (response.items) {
            throw new Error('Entry not found');
          }
          return response;
    }else{
        return ""
    }
    
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// client.getEntry('YOUR_ENTRY_ID')
//   .then(entry => {
//     console.log(entry);
//   })
//   .catch(error => {
//     console.error('Error fetching entry:', error);
//   });