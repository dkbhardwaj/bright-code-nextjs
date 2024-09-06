import { getDataById } from "./getDataById";

export const fetchCardsData = async (cards) => {
    let data
    const promises = cards.map(card => getDataById(card.sys.id));

    try {
      const results = await Promise.all(promises);
    //  console.log(results)
    data = results
    return data;
    } catch (error) {
      
      console.error('Error fetching data:', error);
    }
     
  };