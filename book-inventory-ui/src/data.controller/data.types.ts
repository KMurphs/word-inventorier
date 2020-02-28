
export type TBookSummary = {
  id: string,
  meta: string,
  idType: string,
  wordsCount: number,
  uniqueWordsCount: number,
  mostFrequentWord: TTokenSummary,
  longestWord: TTokenSummary,
  summaryDurationSec: number,
  createdAt: number,
  _createdAt: string,
  results: TQuerySummary[]
}


export type TTokenSummary = {
  key: string,
  frequency: number,
  length: number
}

export type TQuerySummary = {
  uiQuery: TUIQueryItem
  createdAt: number
  _createdAt: string
  durationMs: number
  data: TTokenSummary[]
}



export type TUIQueryItem = {
  minLength: number,
  maxLength: number,
  topN: number
}

export type TUIQuery = {
  book: string,
  queries: TUIQueryItem[]
}

export type TTypeConverter = {
  toBookSummary: (bookObj: any) => TBookSummary,
  toTokenSummary: (tokenObj: any) => TTokenSummary,
  toQuerySummary: (resObj: any) => TQuerySummary,
  toUIQueryItem: (minTokenLength: number, maxTokenLength: number, topNCount: number) => TUIQueryItem
}


const timestampToLocaleString = (ts: number)=>new Date(new Date(ts).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().replace(/.[0-9]+Z$/,'').replace('T',' ')
const typeConverter: TTypeConverter = {
  toBookSummary(bookObj: any): TBookSummary{
    return {
      id: bookObj["id"] ? bookObj["id"] : "",
      meta: bookObj["meta"] ? bookObj["meta"] : "",
      idType: bookObj["idType"] ? bookObj["idType"] : "",

      wordsCount: bookObj["wordsCount"] || bookObj["wordsCount"] === 0 ? bookObj["wordsCount"] : NaN,
      uniqueWordsCount: bookObj["uniqueWordsCount"] || bookObj["uniqueWordsCount"] === 0  ? bookObj["uniqueWordsCount"] : NaN,
      summaryDurationSec: bookObj["summaryDurationSec"] || bookObj["summaryDurationSec"] === 0  ? bookObj["summaryDurationSec"] : NaN,
      createdAt: bookObj["createdAt"] ? bookObj["createdAt"] : 0,
      _createdAt: bookObj["createdAt"] ? timestampToLocaleString(bookObj["createdAt"]) : "Invalid Date",

      mostFrequentWord: this.toTokenSummary(bookObj["mostFrequentWord"]),
      longestWord: this.toTokenSummary(bookObj["longestWord"]),
      
      results: bookObj["results"] ? bookObj["results"].map((res: any) => this.toQuerySummary(res)) : []
    }
  },



  toQuerySummary(resObj: any): TQuerySummary {
      return {
        uiQuery: this.toUIQueryItem(resObj["minTokenLength"], resObj["maxTokenLength"], resObj["topNCount"]),
        createdAt: resObj["createdAt"] ? resObj["createdAt"] : 0,
        _createdAt: resObj["createdAt"] ? timestampToLocaleString(resObj["createdAt"]) : "Invalid Date",
        durationMs: resObj["durationMs"] || resObj["durationMs"] === 0 ? resObj["durationMs"] : NaN,
        data: resObj["data"] ? resObj["data"].map((item: any) => this.toTokenSummary(item)) : []
      }
  },


  toTokenSummary(tokenObj: any): TTokenSummary {
      return {
        key: tokenObj["key"] ? tokenObj["key"] : "",
        frequency: tokenObj["frequency"] || tokenObj["frequency"] === 0 ? tokenObj["frequency"] : NaN,
        length: tokenObj["length"] || tokenObj["length"] === 0 ? tokenObj["length"] : NaN,
      }
  },


  toUIQueryItem(minTokenLength: number, maxTokenLength: number, topNCount: number): TUIQueryItem {
      return {
        minLength: minTokenLength || minTokenLength === 0 ? minTokenLength : NaN,
        maxLength: maxTokenLength || maxTokenLength === 0  ? maxTokenLength : NaN,
        topN: topNCount || topNCount === 0  ? topNCount : NaN,
      }
  }
}

export {typeConverter};
