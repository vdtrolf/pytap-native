export default async function convert(request : string) {
  
    const debug = false;
    
    try {
      const fetchResult = await fetch(request); //Making the req
      const result = await fetchResult.json(); // parsing the response
  
      if (debug) {
        console.log("=== " + request + " ====");
        console.dir(result);
        console.log("=============================================");
      }
  
      return result; // return success object
  
    } catch {
      // No success => we stop everything
      console.log("Connection error");
    }
};
  