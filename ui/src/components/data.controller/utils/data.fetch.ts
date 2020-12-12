/**
 * This function will build and make a http request, then package the response and return it.
 * Works with GET, POST, PUT
 * @param  {string} _url
 * @param  {{[key:string]:any}} parameters?
 * @param  {string="GET"} method
 * @param  {{[key:string]:string}} headers?
 * @returns Promise
 */
const DEBUG = 0;
const httpRequest = ( _url: string, 
                      parameters?: {[key: string]:any},
                      method: string = "GET",
                      headers?: {[key:string]: string}): Promise<any> => {

  
  let url: string = _url;


  // Build generic options for fetch api
  let options: any = {
    method: method,
    headers: {...{'content-type': 'application/json'}, ...headers},
    // mode: 'no-cors'
  }





  // Process Parameters/body
  if(parameters){
    switch(method.toLowerCase()){
      case 'get':
        
        // Build Request parameters in url 
        // Filter parameters to get non empty items on object
        const keys = Object.keys(parameters)
        const validParams = Object.values(parameters)
                                  .reduce((acc, item, index) => {
                                      item && (acc[keys[index]] = item);
                                      return acc;
                                    }
                                  , {})
        // If parameters are not empty, append to url
        if(Object.values(validParams).join("")){
          url = url + Object.keys(validParams).reduce((acc, key, index) => `${acc}${index===0?'?':'&'}${key}=${validParams[key]}`, '')
        }
                                  
        break;
      default:
        // By default parameters will become the json body of the request
        options["body"] = JSON.stringify(parameters)
        break
    }
  }

  DEBUG && console.log(`[fetch] Fetching at '${url}' with options '${JSON.stringify(options)}'`)




  return new Promise((resolve, reject) => {
    fetch(url, options)
    // fakeFetch(url, options)
    .then(res => res.json())
    .then(data=>resolve(data))
    .catch(err => reject(err));
  })

  
}


export default httpRequest;