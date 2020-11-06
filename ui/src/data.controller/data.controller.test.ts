import DataController from './data.controller'
import { TBookSummary } from './data.types';


let testBook: TBookSummary;
let cbWasCalled: boolean = false;

describe("DataController", ()=>{
  test("Will get available texts and present them in correct form", async ()=>{
    const dc = new DataController();
    const texts = await dc.getBooks();
    console.log(texts);
    expect(texts.length).toBeGreaterThan(0);
    testBook = texts[0];
    expect(testBook.idType).toMatch("book");
  })

  test("Will get a book by its id and present it in the correct form", async ()=>{
    const dc = new DataController();
    const book = await dc.getBookById(testBook.id);
    console.log(book);
    expect(book === null).toBe(false);
    book && expect(book.id).toEqual(testBook.id);
    book && expect(book.idType).toEqual(testBook.idType);
  })

  test("Will post some text for processing and get results", async ()=>{
    const cb = ()=>{
      cbWasCalled = true;
    }
    const dc = new DataController();
    const book = await dc.processBook({
      book: "Where is my my umbrella",
      queries: [{
        minLength: 0,
        maxLength: 3,
        topN: 2
      }]
    }, cb);
    console.log(book);
    console.log(book.results[0].uiQuery);
    console.log(book.results[0].data);
    expect(cbWasCalled).toBe(true);
    expect(book === null).toBe(false);


    // book && expect(book.id).toEqual(testBook.id);
    // book && expect(book.idType).toEqual(testBook.idType);
  })
})