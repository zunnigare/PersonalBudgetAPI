import express from 'express';
try{
    const app = express();
    await app.listen(3000);
}catch(e){
    console.log(`\x1b[31m${e.message}\x1b[0m`);
}