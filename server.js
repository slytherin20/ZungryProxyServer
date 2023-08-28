const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.get('/',(req,res)=> res.json({"test":"Proxy Server is running successfully"}));
app.get('/api/restaurants',(req,res)=>{
    const {lat,long} = req.query;
    let uri = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&page_type=DESKTOP_WEB_LISTING`;

    fetch(uri,{
        headers:{
            'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
    }).then(response=>{
        if(!response.ok){
            throw new Error("An Error occured fetching data");
        }
        else return response.json();
    }).then(data=>{
        res.json(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("An Error occured fetching data");
    })
});

app.get('/api/menu',(req,res)=>{
    const {lat,long,id} = req.query;
    let url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;


    fetch(url,{
        headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*',
            'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
    }).then(response=>{
        if(!response.ok) throw new Error("An error occured while fetching data");
        else return response.json();
    }). then(data=> res.json(data)).catch(err=>{
        console.log(err);
        res.status(500).send("An error occured while fetching data")
    })
})
app.listen(port,()=>{
    console.log("Server listening on port",port);
})