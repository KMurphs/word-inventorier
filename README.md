# corpus-word-inventory
Project used to build an inventory of words from a body of text while keeping track of some statistics like frequency and length.


  - The Front End is written with ReactJS. See ``book-inventory-ui`` folder.
  - The Back End services is fulfilled by ASP.NET running from a Docker Container. See ``web-app`` folder.
  - The Container is deployed on Heroku. See ``web-app\WebApp\bin\Release\netcoreapp3.1`` folder.


Access the application live at:
```
[https://corpus-inventory.herokuapp.com/](https://corpus-inventory.herokuapp.com/)
```

## Front End
The front end is a typical React project. A generic react readme file is included in ``book-inventory-ui``.

Once the react project is built, the ``push-ui-to-backend.bat`` script can be used to push the app to heroku