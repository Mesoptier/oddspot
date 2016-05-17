OddSpot
=======
> OddSpot asks you a set of questions about the spot on your skin and determines the likelihood that a spot is Actinic Keratosis (a possible precursor to skin cancer) or Basal Cell Carcinoma (a form of skin cancer) based on your answers. Our predictive model is based on our scientific research on previous spots and generates a prediction that is comparable in accuracy to that of a trained professional.

Installation
------------

Make sure that you have [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) and [PHP (5.5+)](http://php.net/) installed. Then execute the following commands:

```shell
> git clone git@github.com:Mesoptier/oddspot.git # Creates a new 'oddspot' directory containing the source files
> cd oddspot # Enters the folder
> npm install # Installs the requires packages, may take a while
> npm install gulp-cli -g # Installs Gulp globally, so that you can run tasks more easily
```

#### PHP server
The PHP server controls the backend of the app. You can start it using the following command:

```shell
> gulp php-server
```

You can stop the server with `Ctrl + C`.

#### Webpack Dev Server
This server will recompile the source files and reload the page when a change is made. The following command will start the server:

```shell
> gulp webpack-dev-server
```

You can stop the server with `Ctrl + C`.
