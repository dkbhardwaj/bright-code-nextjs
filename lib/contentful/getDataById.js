import {client} from './client';

// Fetch entry by slug
export async function getDataById(id) {
  try {
    if(id){
        console.log(id)
        const response = await client.getEntry({
            id
        });
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