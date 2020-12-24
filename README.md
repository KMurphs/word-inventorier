# [Corpus Word Inventory](https://github.com/KMurphs/word-inventorier)



## Overview

-  Project was born as a proof of concept. The Core service is provided as an API that will analyze some text and perform frequency/length based queries. (e.g. List top 50 words from submitted text with length between 10 and 50).
-  The backend is written in C# with ASP.NET, then containerized using Docker (and deployed at [Heroku](https://corpus-inventory.herokuapp.com/)). It provides the core service along with utilities to preprocess and serialize/deserialize the data structure summarizing the text internal frequency structure.
-  To illustrate usage a front client was designed using Figma, and implemented using ReactJS, Typescript and Tailwindcss
-  The front end application is served by the backend but interact with the core service using the API presented above.



## Definition

Project used to build an inventory of words from a body of text while keeping track of some statistics like frequency and length. As the sole developer, I conceived, designed, implemented and documented the solution. Access the application live at: [https://corpus-inventory.herokuapp.com/](https://corpus-inventory.herokuapp.com/)

``Duration``: 2 weeks 

``Tools, Technologies, skills``: NUnit Testing Framework, ASP.NET, REST API, Docker, Heroku, Figma, React, Typescript, Tailwindcss

``Languages``: C#, Batch Files, Javascript/Typescript



## Context

Initially, the concept was born out of a discussion with a friend. I had some free time on my hand and was wondering the best method to quickly analyze a huge amount of text and perform queries such as retrieving the top 100 most frequent words with length between 10 and 50 for example.


## The Process

![Process](https://github.com/KMurphs/word-inventorier/blob/master/docs/Process.png "Development and Design Process")
