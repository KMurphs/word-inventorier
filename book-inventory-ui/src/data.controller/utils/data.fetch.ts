
const httpRequest = (
                      _url: string, 
                      parameters?: {[key: string]:any},
                      method: string = "GET",
                      headers?: {[key:string]: string}) => {

  
  let _header = {'content-type': 'application/json'}
  let url: string = _url;



  

  // Build generic options for fetch api
  let options: any = {
    method: method,
    headers: {..._header, ...headers},
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

  console.log(`[fetch] Fetching at '${url}' with options '${JSON.stringify(options)}'`)




  return new Promise((resolve, reject) => {
    fetch(url, options)
    // fakeFetch(url, options)
    .then(res => res.json())
    .then(data=>resolve(data))
    .catch(err => reject(err));
  })

  
}


export default httpRequest;