import DataController from './data.controller'
import { TTextSummary } from './data.types';


let testText: TTextSummary;


describe("DataController", ()=>{
  test("Will get available texts and present them in correct form", async ()=>{
    const dc = new DataController();
    const texts = await dc.getTexts();
    // console.log(texts);
    expect(texts.length).toBeGreaterThan(0);
    testText = texts[0];
    expect(testText.idType).toMatch("text");
  })

  test("Will get a text by its id and present it in the correct form", async ()=>{
    const dc = new DataController();
    const [testText] = await dc.getTexts();
    const text = await dc.getTextById(testText.id);
    // console.log(text);
    expect(text === null).toBe(false);
    text && expect(text.id).toEqual(testText.id);
    text && expect(text.idType).toEqual(testText.idType);
  })

  test("Will post some text for processing and get results", async ()=>{
    let cbWasCalled: boolean = false;
    const cb = ()=>{
      cbWasCalled = true;
    }
    const dc = new DataController();
    const text = await dc.processText({
      text: "Where is my my umbrella",
      queries: [{
        minLength: 0,
        maxLength: 3,
        topN: 2
      }]
    }, cb);
    // console.log(text);
    // console.log(text.results[0].uiQuery);
    // console.log(text.results[0].data);
    expect(cbWasCalled).toBe(true);
    expect(text === null).toBe(false);


    // text && expect(text.id).toEqual(testText.id);
    // text && expect(text.idType).toEqual(testText.idType);
  })
})