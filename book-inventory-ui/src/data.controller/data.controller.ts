import httpRequest from "./utils/data.fetch";
import { TUIQuery, TBookSummary, typeConverter } from "./data.types";





export default class DataController {
  // private urlBaseDevelopment: string = "https://localhost:5051/";
  private urlBaseDevelopment: string = "http://localhost:5050/";
  private urlBaseProduction: string = "https://corpus-inventory.herokuapp.com/";
  private urlBase: string = "";
  private urlGetAllBooks: string = "api/corpusinventory";
  // private urlGetABook: string = "api/corpusinventory/{id}";
  private urlProcessABook: string = "api/corpusinventory";

  // private setUiData: Function
  // private timerID: any
  // private dataRefreshRateSec: number = 15;
  getVersion(){
    return '1.0'
  }
  // constructor(setUiData: Function){
  constructor(){
    // Determine whether we shoudl use dev urls or production urls at heroku
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.warn("[DC]: App is in Development Mode");
      this.urlBase = this.urlBaseDevelopment;
    } else {
      console.warn("[DC]: App is in Production Mode");
      this.urlBase = this.urlBaseProduction;
    }
    this.urlBase = this.urlBaseDevelopment;
    // this.setUiData = setUiData

    // const _this = this
    // this.timerID = setInterval(()=>{
    //   _this.getBooks()
    // }, this.dataRefreshRateSec)

  }
  
  


  // Makes sure we are talking to right backend
  buildURL(url: string){
    return `${this.urlBase}${url}`
  }





  async getBooks(): Promise<TBookSummary[]>{
    let rawBooks = await httpRequest(this.buildURL(this.urlGetAllBooks));
    return (rawBooks as any[]).map((rawBook: any) => typeConverter.toBookSummary(rawBook))
  }
  async getBookById(bookId: string): Promise<TBookSummary|null>{
    let rawBook = await httpRequest(`${this.buildURL(this.urlGetAllBooks)}/${bookId}`);
    return typeConverter.toBookSummary(rawBook);
  }
  processBook(uiQuery: TUIQuery, cb: Function): Promise<TBookSummary>{
    return new Promise(async (resolve, reject) => {
      await httpRequest(`${this.buildURL(this.urlProcessABook)}`, uiQuery, "POST")
      .then((res)=>{
        console.log(res)
        cb();
        resolve(typeConverter.toBookSummary(res));
      })
      .catch((err)=>{
        reject(err);
      })
    })

  }






  
}