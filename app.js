//IMPORT EXPRESS AND PATH
const express = require('express');
const path = require('path');
//IMPORT MOMENT JS FOR TIME CONVERSION
const moment = require('moment');
//START THE APP
const app = express();
//THE PORT SHOULD BE EITHER WHATS GIVEN OR 3000
const port = process.env.PORT || 3000;
//SERVE STATIC INDEX.HTML
app.use(express.static(path.join(__dirname, 'public')));
//SEND PUBLIC FOLDER ON INDEX ROUTE
app.get('/', (req, res) => {
  res.send(path.join(__dirname, 'public'));
});
//API STUFF
app.get('/:param', (req, res) => {
  //THE PARAM GIVEN IS THE DATE
  let param = req.params.param;
  //START CONVERSIONS AS NULL
  let natural = null;
  let unix = null;
  //CHECK IF PARAM IS A NUMBER, IF SO ITS UNIX
  if (param >= 0) {
    unix = param;
    natural = toNat(param);
  }
  // IF NOT A NUMBER, CHECK IF ITS A DATE, AND FORMAT IT
  if (isNaN(param) && moment(param, "MMMM D, YYYY").isValid()) {
    unix = toUnix(param);
    natural = toNat(unix);
  }
  //FORMAT UNIX TO NATURAL
  function toNat(param) {
    return  moment.unix(param).format("MMMM D, YYYY");
  }
  //FORMAT NATURAL TO UNIX
  function toUnix(param) {
    return  moment(param, "MMMM D, YYYY").format("X");
  }
  //CREATE THE RESPONSE OBJECT, AND SEND IT OUT
  let returnObj = {unix, natural};
  res.send(returnObj);


})

//SERVER
app.listen(port, ()=>{
  console.log(`Listening on port:${port}`);
})
