OddSpot
=======
> OddSpot asks you a set of questions about the spot on your skin and determines the likelihood that a spot is Actinic Keratosis (a possible precursor to skin cancer) or Basal Cell Carcinoma (a form of skin cancer) based on your answers. Our predictive model is based on our scientific research on previous spots and generates a prediction that is comparable in accuracy to that of a trained professional.

Installation
------------

Make sure that you have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) installed. Then execute the following commands:

```shell
> git clone git@github.com:Mesoptier/oddspot.git # Creates a new 'oddspot' directory containing the source files
> cd octopus-trivia # Enters the folder
> npm install # Installs the requires packages, may take a while
```

#### Starting PHP server
Start the PHP server in `/public`.

#### Starting assets server
You can now start a server that will automatically compile the source files and makes them accessible on `http://localhost:8080`. This server will recompile the source files and reload the page when a change is made. The following command will start the server:

```shell
> npm start
```

You can stop the server with `Ctrl + C`.
