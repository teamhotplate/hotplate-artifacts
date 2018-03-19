# hotplate-artifacts

A web forum template with customizable colors and Nabvar Logo and title.
[Download here](https://gp3hotplate.herokuapp.com/p/forum)
[View Demo Here](https://gp3hotplate-plate.herokuapp.com/)

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes. See deployment notes for how to deploy the porject to [heroku](https://www.heroku.com/)

### Prerequisites

```
* Node.js
* yarn
* mySQL server
```
### Local Setup

To get the project up and running on your local machine you first need to download the project from [hotplate](https://gp3hotplate.herokuapp.com/p/forum).
This will allow you to set colors and other parameters to whatever you desire.
[See parameters list for details](#Description of Parameters)

After download, unarchive the `tar.gz` file.

`cd` to the root directory of the no uncompressed folder and run

```yarn install```

when that finishes `cd ./client` and run

```yarn install```

Finally `cd ../` to get back to the root directory of the project and run

```yarn start```

If all goes correctly this should automatically start the app on your localhost.


# Description of Parameters


* greeting

   The text that will show up on the front page of the forum to greet people as they come to the site. Can be any string of text.
   See [Front.js](./client/src/pages/Front/Front.js
)

* primaryColor

   The color of the navbar at the top of the screen. 
   Requires any color that can be parsed in a css sheet. (ex. `red`, `#FF0000`, `rgb(255, 0, 0)`)
   See [app.css](./client/src/pages/Front/Front.js)

* secondaryColor

   The color used for the buttons, the link text, and other small highlights  throughout the app
   Requires any color that can be parsed in a css sheet. (ex. `red`, `#FF0000`, `rgb(255, 0, 0)`)
   See [app.css](./client/src/pages/Front/Front.js)

* backgroundColor

   The color of the background. Behind all components and text.
   Requires any color that can be parsed in a css sheet. (ex. `red`, `#FF0000`, `rgb(255, 0, 0)`)
   See [app.css](./client/src/pages/Front/Front.js)

* foregroundColor

   The background color of the components. Componenets are on cards above the "background" and so by default their background color is white. This parameter can change that to whatever color you like.
   Requires any color that can be parsed in a css sheet. (ex. `red`, `#FF0000`, `rgb(255, 0, 0)`)
   See [app.css](./client/src/pages/Front/Front.js)

* btnTextColor

   This parameter allows you to change the default btnTextColor from white to whatever you'd like. May need to be changed to black if you make the buttons a bright color that won't contrast with white.
   Requires any color that can be parsed in a css sheet. (ex. `red`, `#FF0000`, `rgb(255, 0, 0)`)
   See [app.css](./client/src/pages/Front/Front.js)

* secondaryColorFocus

   The color that the buttons changes to when clicked. When buttons are clicked they darken a bit from their default color. This is where you can set that slightly darker color.
   Requires any color that can be parsed in a css sheet. (ex. `red`, `#FF0000`, `rgb(255, 0, 0)`)

   See [app.css](./client/src/pages/Front/Front.js)

* CompanyName

   Name of company. Will be seen on the navbar at the top of each page.
   Requires a text string
   See [Nav.js](./client/src/components/Nav/Nav.js)

* LogoImageUrl

   Logo image which will be in the top left corner of the navbar on every page.
   Requires an image url.
   See [Nav.js](./client/src/components/Nav/Nav.js)
