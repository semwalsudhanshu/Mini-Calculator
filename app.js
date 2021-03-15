const path = require('path')
const express = require('express')
const user_agent = require('express-useragent')
const app = express()

const createLogstash = require('logstash');
const url = 'http://35.236.216.100:5000';
const level = 'info'
const logger = createLogstash(url,level);



app.use(express.static('public'))
app.use('/',(req,res)=>{
  var request_method = req.method;
  var request_host = req.headers.host;
  var currentdate = new Date(); 
  var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  var src =req.headers['user-agent'];
  ua = user_agent.parse(src)
  var user_details = {
                      isMobile:ua.isMobile,
                      isTablet:ua.isTablet,
                      isiPhone :ua.isiPhone,
                      isAndroid : ua.isAndroid,
                      os:ua.os,
                      browser : ua.browser,
                      platform : ua.platform,
                      version : ua.version,
                      isBot : ua.isBot
                    }
  logger.info("REQUEST LOG", { REQUEST_METHOD: req.method,
                               REQUEST_HOST:req.headers.host,
                               REQUEST_DATETIME:datetime,
                               REQUEST_PARAMETERS:req.params,
                               REQUEST_PROTOCOL:req.protocol,
                               REQUEST_IP:req.ip,
                               USER_DETAILS:user_details 
               });
  res.sendFile(path.join(__dirname,'public','index.html'))
})


app.listen(3000)
console.log("Application is up and running")