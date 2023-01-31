const express = require('express');
const router = express.Router();
const database = require('./apiRouter');
const qs = require('qs')

router.get("/home",(req,res)=>{
    res.sendFile('/WT/index.html',{ root: '../' });
})

router.get("/uiux",(req,res)=>{
    res.sendFile('/WT/uxui.html',{ root: '../' });
})

router.get("/blog",(req,res)=>{
    res.sendFile('/WT/blog.html',{ root: '../' });
})

router.get("/insert",(req,res)=>{
    res.sendFile('/WT/insert.html',{ root: '../' });
})

router.get("/vypisUdajov",(req,res)=>{
    res.sendFile('/WT/vypis_udajov.html',{ root: '../' });
})


//DB calls
router.get("/DB/:id",async(req,res)=>{
    console.log("params to JSNON", qs.parse(req.params.id));
    console.log("params", req.params.id);
    console.log(req.query);
    console.log("call catched")
    const JSONdbData = await database.getAll();
    //console.log(JSONdbData);
    res.json(qs.parse(JSONdbData));
 

   
    
})

router.get("/api/getAll",async(req,res)=>{
    const JSONdbData = await database.getAll();
    res.json(qs.parse(JSONdbData));
})

router.get("/api/getBy/:id",async(req,res)=>{
    console.log("params to JSNON", qs.parse(req.params.id));
    const data = qs.parse(req.params.id);
    const JSONdbData= await database.searchBy(data.key,data.value);
    res.json(qs.parse(JSONdbData));

    //const JSONdbData = await database.searchBy();
    //res.json(qs.parse(JSONdbData));
})

router.get("/api/getSize",async(req,res)=>{
    const JSONdbData= await database.getSize();
    res.json(qs.parse(JSONdbData));

    //const JSONdbData = await database.searchBy();
    //res.json(qs.parse(JSONdbData));
})

router.post("/api/postMem/",async(req,res)=>{
    console.log("params to JSNON", req.body);
    //const JSONdbData = await database.addMember();
    const JSONdbData= await database.postMember(req.body);
    res.json(qs.parse(JSONdbData));
    
})

router.post("/api/addCol/",async(req,res)=>{
    console.log("params to JSNON", req.body);
    //const JSONdbData = await database.addMember();
    const JSONdbData= await database.addColumn(req.body);
    res.json(qs.parse(JSONdbData));
    
})




module.exports=router;