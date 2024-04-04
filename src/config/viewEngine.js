import ejs from "ejs";
import express from "express";
const configViewEngine = (app) =>{
    app.use(express.static('./src/public'))
    app.engine('html', ejs.renderFile);
    app.set('view engine', 'ejs');
    app.set('views', './src/views');
}

export default configViewEngine