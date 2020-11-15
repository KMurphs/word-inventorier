import httpRequest from "./utils/data.fetch";
import { TUIQuery, TTextSummary, typeConverter } from "./data.types";





export default class DataController {
  // private urlBaseDevelopment: string = "https://localhost:5051/";
  private urlBaseDevelopment: string = "http://localhost:5050/";
  // private urlBaseProduction: string = "https://corpus-inventory.herokuapp.com/";
  // private urlBaseProduction: string = `${window.location.origin}/`; //Prevent the cors error between http and https
  private urlBase: string = "";
  private urlGetAllTexts: string = "api/corpusinventory";
  // private urlGetAText: string = "api/corpusinventory/{id}";
  private urlProcessAText: string = "api/corpusinventory";

  // private setUiData: Function
  // private timerID: any
  // private dataRefreshRateSec: number = 15;
  getVersion(){
    return '1.1'
  }
  // constructor(setUiData: Function){
  constructor(){
    // Determine whether we shoudl use dev urls or production urls at heroku
    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //   console.warn("[DC]: App is in Development Mode");
    //   this.urlBase = this.urlBaseDevelopment;
    // } else {
    //   console.warn("[DC]: App is in Production Mode");
    //   this.urlBase = this.urlBaseProduction;
    // }
    // this.urlBase = this.urlBaseDevelopment;
    // this.urlBase = this.urlBaseProduction;
    this.urlBase = `${window.location.origin}/`;
    if(this.urlBase.indexOf("localhost") !== -1){
      this.urlBase = this.urlBaseDevelopment
    }
    // this.setUiData = setUiData

    // const _this = this
    // this.timerID = setInterval(()=>{
    //   _this.getTexts()
    // }, this.dataRefreshRateSec)

  }
  
  


  // Makes sure we are talking to right backend
  buildURL(url: string){
    return `${this.urlBase}${url}`
  }





  async getTexts(): Promise<TTextSummary[]>{
    let rawTexts = await httpRequest(this.buildURL(this.urlGetAllTexts));
    return (rawTexts as any[]).map((rawText: any) => typeConverter.toTextSummary(rawText))
  }
  async getTextById(textId: string): Promise<TTextSummary|null>{
    let rawText = await httpRequest(`${this.buildURL(this.urlGetAllTexts)}/${textId}`);
    return typeConverter.toTextSummary(rawText);
  }
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