export type TTextSummary = {
  id: string,
  meta: string,
  idType: string,
  wordsCount: number,
  uniqueWordsCount: number,
  mostFrequentWord: TTokenSummary,
  leastFrequentWord: TTokenSummary,
  longestWord: TTokenSummary,
  shortestWord: TTokenSummary,
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
  text: string,
  queries: TUIQueryItem[]
}

export type TTypeConverter = {
  toTextSummary: (textObj: any) => TTextSummary,
  toTokenSummary: (tokenObj: any) => TTokenSummary,
  toQuerySummary: (resObj: any) => TQuerySummary,
  toUIQueryItem: (minTokenLength: number, maxTokenLength: number, topNCount: number) => TUIQueryItem
}


const timestampToLocaleString = (ts: number)=>new Date(new Date(ts).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().replace(/.[0-9]+Z$/,'').replace('T',' ')
const typeConverter: TTypeConverter = {
  toTextSummary(textObj: any): TTextSummary{
    return {
      id: textObj["id"] ? textObj["id"] : "",
      meta: textObj["meta"] ? textObj["meta"] : "",
      idType: textObj["idType"] ? textObj["idType"] : "",

      wordsCount: textObj["wordsCount"] || textObj["wordsCount"] === 0 ? textObj["wordsCount"] : NaN,
      uniqueWordsCount: textObj["uniqueWordsCount"] || textObj["uniqueWordsCount"] === 0  ? textObj["uniqueWordsCount"] : NaN,
      summaryDurationSec: textObj["summaryDurationSec"] || textObj["summaryDurationSec"] === 0  ? textObj["summaryDurationSec"] : NaN,
      createdAt: textObj["createdAt"] ? textObj["createdAt"] : 0,
      _createdAt: textObj["createdAt"] ? timestampToLocaleString(textObj["createdAt"]) : "Invalid Date",

      mostFrequentWord: this.toTokenSummary(textObj["mostFrequentWord"]),
      leastFrequentWord: this.toTokenSummary(textObj["leastFrequentWord"]),
      longestWord: this.toTokenSummary(textObj["longestWord"]),
      shortestWord: this.toTokenSummary(textObj["shortestWord"]),
      
      results: textObj["results"] ? textObj["results"].map((res: any) => this.toQuerySummary(res)) : []
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