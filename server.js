const express = require('express')
const app = express()

const port = 3006
app.listen(port,function(){
    console.log(`server irunning on port ${port}`);
})