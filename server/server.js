const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');

const port=process.env.PORT || 3000;
const api_key='79213850-0ee2-11e7-9462-00163ef91450';

var app=express();

app.use(bodyParser.json());

app.post('/sendotp',(req,res)=>{
  var {phonenumber} = _.pick(req.body, ['phonenumber']);
  request.post('https://2factor.in/API/V1/'+api_key+`/SMS/+${phonenumber}/AUTOGEN`,(err,response,body)=>{
    res.status(200).send(body);
  });
})

app.post('/verifyotp',(req,res)=>{
  var input=_.pick(req.body,['sessionid','otp']);
  request.post(`https://2factor.in/API/V1/${api_key}/SMS/VERIFY/${input.sessionid}/${input.otp}`,(err,response,body)=>{
    res.status(200).send(body);
  });
})

app.listen(port,()=>{
  console.log(`Started up at the port ${port}`);
});
