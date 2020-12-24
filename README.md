# [Word Inventorier](https://github.com/KMurphs/word-inventorier)



## Overview

-  Project was born as a proof of concept. The Core service is provided as an API that will analyze some text and perform frequency/length based queries. (e.g. List top 50 words from submitted text with length between 10 and 50).
-  The backend is written in C# with ASP.NET, then containerized using Docker (and deployed at [Heroku](https://corpus-inventory.herokuapp.com/)). It provides the core service along with utilities to preprocess and serialize/deserialize the data structure summarizing the text internal frequency structure.
-  To illustrate usage a front client was designed using Figma, and implemented using ReactJS, Typescript and Tailwindcss
-  The front end application is served by the backend but interact with the core service using the API presented above.



## Definition

Project used to build an inventory of words from a body of text while keeping track of some statistics like frequency and length. As the sole developer, I conceived, designed, implemented and documented the solution. <br/>Access the application live at: [https://corpus-inventory.herokuapp.com/](https://corpus-inventory.herokuapp.com/)

**Duration**: 2 weeks 

**Tools, Technologies, Skills**: NUnit Testing Framework, ASP.NET, REST API, Docker, Heroku, Figma, React, Typescript, Tailwindcss

**Languages**: C#, Batch Files, Javascript/Typescript



## Context

Initially, the concept was born out of a discussion with a friend. I had some free time on my hand and was wondering the best method to quickly analyze a huge amount of text and perform queries such as retrieving the top 100 most frequent words with lengths between 10 and 50 for example.


## The Process

![Process](https://raw.githubusercontent.com/KMurphs/word-inventorier/master/docs/Process.png "Development and Design Process")


## Core Solution Research

1. The initial question was how to retrieve the top (50) most frequent in a body of text. There are many solution to a problem like this: 
    - The initial inclination was to use a dictionary where each word would become a key associated to the number of times that word occured.

    <br>Then an extra requirement was added to make the problem a little bit more interesting: 
    - The algorithm should be able to look at words with lengths in a certain range (say between 10 and 20).

    The initial algorithm would still inventory the whole text in ``O(N)``, where ***N is the number of words in the text***. The dictionary would call for a space complexity of ``O(M)``, where  ***M is the number of unique words in the text***. 

2. From thereon, to retrieve the top 50, a sorting algorithm could be used and the solution would take ``O(MlogM)``. 
<br>A *modified bubble sort* could bring down the time complexity to ``O(kM)`` by only considering the top K most frequent words - As long as, K is way smaller than logM (``K << logM``), the modified bubble sort is a better alternative. 
<br>On top of this, this modified bubble would handle the length requirement of the query without trouble at all.

3. Another requirement was to be able to reuse the processing of this huge text to run different queries at a later point. This meant that the text processing algorithm and the query processing happened at different point in time.
    - So the dictionary algorithm in ``O(N)`` and ``O(M)`` could still be used for the text processing. The query processing would use the modified bubble sorting in ``O(M)`` and ``O(k)``.

    A step further was to investigate whether this last time complexity of ``O(M)`` could be reduced. 
    <br>For that, an extra data structure was created during the text processing. 
    - This data structure is also a dictionary where keys are words lengths in the text, and values are linkedlist of words whose lengths ave the value specified by the key they are associated to. This extra structure adds another ``O(M + d)`` to the space complexity of the text processing phase - ***d (the number of possible word lengths within the text)*** is bounded by the longest word in the english dictionary ***pneumonoultramicroscopicsilicovolcanoconiosis - Length = 45***.
    <br>``d <= 45`` therefore ``d << M``. 
    
    This data structure will bring down the time complexity of the query processing by allowing the algorithm to only process ***words that have length within a specified range***. If there are ***V*** such words, the new time complexity is ``O(V)``. <br>In some instances V can be way smaller than M.

In summary, 
- Text Processing: ``O(N) Time Complexity, O(M) space complexity``
- Query Processing: ``O(V) Time Complexity, O(k) space complexity``

where,
- N: number of words in text
- M: number of unique words in text
- V: number of unique words with length within the specified range
- k: number of words of interest (the top k most frequent words)

The dictionary of frequencies ``IDictionary<string, int>`` and the dictionary of lengths ``IDictionary<int, LinkedList<string>>`` can easily be serialized and deserialized.



## MVP and Unit Testing

See ``<Current Repository>/text-inventorier/Inventorier/``

The first step was to implement the core service that would process the text and run the query. Tests were developed to ensure functionality and corner cases (See ``<Current Repository>/text-inventorier/Inventorier.NUnitTests/``)

A range of utility classes are used to fetch the text when a URL is provided, preprocess the text (Handle special characters, lower case all the text, ...), serialize and deserialize the data structures, hashing the text into an ID that can be used later to skip re-processing the text if the processing result is stored in our database.

## API and Productionization

See ``<Current Repository>/text-inventorier/WebApp/``
Now that we have functional code, we can wrap it into an API.

First step was to set up a ASP.NET server locally, and integrate with our core service at endpoint ``<Site URL>/api/corpusinventory``. Then integrate with MongoDB to store and retrieve serialized data structures.

A docker image for ``aspnet:3.1`` is available (See ``<Current Repository>/text-inventorier/WebApp/DockerFile``). The image was built, pushed to a remote repo, and Heroku was configured to retrieve and run the docker image.

``<Current Repository>/text-inventorier/scripts/push-app-to-backend.bat`` describes some of the commands used to perform this.



## UI Solution Research and Ideation

To show how the API could be consumed, a React Client was to be written that would demonstrate this.

Sites like Dribble, Behance, and Google were surveyed to generate ideas for a suitable UI/UX concepts related to our word inventorier application.

Information Architecture was first established as the most important aspect of the UI/UX considerations. Once related questions were answered, wireframes were drafted.

![Wireframes](https://raw.githubusercontent.com/KMurphs/word-inventorier/master/docs/Process.png "Wireframes")

## UI Design and Prototyping

Figma was used to design the UI.

The Mobile first Version of the front end client

![Mobile First Version](https://raw.githubusercontent.com/KMurphs/word-inventorier/master/docs/ui-mobile-lg.png "Mobile First Version of UI")

## References
1. https://stackoverflow.com/questions/4495241/given-a-file-find-the-ten-most-frequently-occurring-words-as-efficiently-as-pos
2. https://www.geeksforgeeks.org/python-count-occurrences-of-each-word-in-given-text-file-using-dictionary/
3. 