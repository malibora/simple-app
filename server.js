const express = require('express');
const cors = require('cors');
const fs = require('fs')
const createBrowserless = require('browserless')
const getHTML = require('html-get')

const app = express();
const PORT = 80;
const browserlessFactory = createBrowserless()

app.use(cors({
  origin: '*'
}));

app.get('/', async (req, res) => {
  try {
    fs.readFile('./index.html', (err, data)=>{
      res.status(200).write(data)
      res.end()
    }
    )
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/summarize', async (req, res) => {
try{
    const browserContext = browserlessFactory.createContext()
    const getBrowserless = () => browserContext
  
     getHTML(req.query.url, { getBrowserless }).then(result=> {
       getBrowserless((browser) => browser.destroyContext())
       .then(
        res.status(200).send(result.html)
       )
      
     })
    // close the browser context after it's used
  
    }
    catch(err){
      res.status(500).write(err)
    }

})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});