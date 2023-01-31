// JUST BASIC STRUCTURE
require('dotenv').config()
const {Pool,Client} = require('pg');
makeClient = async() =>{
   
    const client = new Client({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    })
    return client;

}

//GET ALL -> dbCall
getAll = async()=>{
    const client = await makeClient();
    await client.connect()
    console.log("succesfully connected to DB");
    //const res2 = await client.query('SELECT * FROM members WHERE id = $1',[id])
    const res2 = await client.query('SELECT * FROM members');
    console.table(res2.rows);
    //console.log(res2.rows);
    
    await client.end()
    return {data:res2.rows,size:res2.rows.length};
}
//GET
searchBy = async(key_,value_)=>{
    const client = await makeClient();
    console.log("skuska searcBY",key_,value_);
    await client.connect()
    console.log("succesfully connected to DB");
    const res2 = await client.query('SELECT * FROM members WHERE '+key_+' =$1',[value_])
    //const res2 = await client.query('SELECT meno,priezvisko,vek,pribuzenstvo FROM members');
    console.table(res2.rows);
    //console.log(res2.rows);
    
    await client.end()
    return {data:res2.rows,size:res2.rows.length};
}
//POST
//ALTER TABLE -> rozsirenie poloziek

//get count
getSize = async()=>{
    const client = await makeClient();
    await client.connect()
    console.log("succesfully connected to DB");
    //const res2 = await client.query('SELECT * FROM members WHERE id = $1',[id])
    const res2 = await client.query('SELECT * FROM members');

    console.log(res2.rows[0],Object.keys(res2.rows[0]));
    //console.log(res2.rows);
    
    await client.end()
    return {data:Object.keys(res2.rows[0]),size:Object.keys(res2.rows[0]).length};
}

postMember = async(obj) =>{
    const client = await makeClient();
    await client.connect()
    console.log("succesfully connected to DB");
    temp = "";
    temp2 ="";
    for(let i=0;i<obj.keys.length;i++){
        temp+=obj.keys[i];
        temp2+="$"+(i+1).toString();
        if(i!=obj.keys.length-1){
            temp+=",";
            temp2+=",";
        }
    }
    console.log("temp",temp);
    const res2 = await client.query('INSERT INTO members ('+temp+') VALUES ('+temp2+')',obj.array);

   
    //console.log(res2.rows);
    
    await client.end()
    return {message:"member succesfully added"};
}
//
addColumn = async(obj)=>{
    const client = await makeClient();
    await client.connect()
    console.log("succesfully connected to DB",obj.data[2]);
    const res2 = await client.query("ALTER TABLE members ADD COLUMN "+obj.data[0]+" "+obj.data[1]+" DEFAULT '"+obj.data[2]+"';");

   
    //console.log(res2.rows);
    
    await client.end()
    return {message:"member succesfully added"};
}



module.exports={
    getAll,
    searchBy,
    getSize,
    postMember,
    addColumn
};