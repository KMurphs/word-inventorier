import httpRequest from "./utils/data.fetch";
import { TUIQuery, TTextSummary, typeConverter } from "./data.types";





export default class DataController {
  private urlBaseDevelopment: string = "http://localhost:5050/";
  private urlBase: string = "";
  private urlGetAllTexts: string = "api/corpusinventory";
  private urlProcessAText: string = "api/corpusinventory";



  getVersion(){
    return '1.1'
  }



  constructor(){
    this.urlBase = `${window.location.origin}/`;
    if(this.urlBase.indexOf("localhost") !== -1){
      this.urlBase = this.urlBaseDevelopment
    }
  }
  
  



  /**
   * Ensures we are talking to right backend (dev url or production url)
   * 
   * @param  {string} uri: Endpoint of interest for a particular request
   */
  buildURL(uri: string){
    return `${this.urlBase}${uri}`
  }

  /**
   * Retrieves the complete list of processing results of texts previously submitted to the backend
   * 
   * @returns Promise\<TTextSummary[]\>
   */
  async getTexts(): Promise<TTextSummary[]>{
    let rawTexts = await httpRequest(this.buildURL(this.urlGetAllTexts));
    return (rawTexts as any[]).map((rawText: any) => typeConverter.toTextSummary(rawText))
  }
  
  /**
   * Function will retrieve Processing Results from previously suubmitted text
   * This text would be identified by an id that is passed as argument to this function
   * 
   * @param  {string} textId
   * @returns Promise\<TTextSummary|null\>
   */
  async getTextById(textId: string): Promise<TTextSummary|null>{
    let rawText = await httpRequest(`${this.buildURL(this.urlGetAllTexts)}/${textId}`);
    return typeConverter.toTextSummary(rawText);
  }

  /**
   * This function will receive a query data structure and will return a new data structure formed with the server response to the request
   * 
   * Example Call:
   * 
   * const text = await dc.processText({
   *    text: "Where is my my umbrella",
   *    queries: [{
   *        minLength: 0,
   *        maxLength: 3,
   *        topN: 2
   *    }]
   * }, cb);
   * 
   * .
   * 
   * @param  {TUIQuery} uiQuery: Text to process and Array of query items i.e. [{ minLength: number, maxLength: number, topN: number }]
   * @param  {Function} cb: Callback - Called when server response has been received and successfully processed
   * @returns Promise\<TTextSummary\>
   */
  processText(uiQuery: TUIQuery, cb: Function): Promise<TTextSummary>{
    return new Promise(async (resolve, reject) => {
      await httpRequest(`${this.buildURL(this.urlProcessAText)}`, uiQuery, "POST")
      .then((res)=>{
        console.log(res)
        cb();
        resolve(typeConverter.toTextSummary(res));
      })
      .catch((err)=>{
        reject(err);
      })
    })

  }






  
}