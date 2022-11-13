import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import express from 'express';
import fs from 'fs';

const PORT = process.env.PORT || 3006;
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);
  // ReactDOMServer's "renderToString" is used to render the app to a static HTML string.
  const indexFile = path.resolve('./build/index.html');
  // Express is used to serve contents from the "build" directory as static files.

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.log('Something went wrong: '.err);
      return res.status(500).send('Oops, better luck next time!');
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
      // The Static index.html file from the built client app is read.
      // The apps's static content is injected into the <div> with an id of "root".
      // This is sent as a response to the request.
    );
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
