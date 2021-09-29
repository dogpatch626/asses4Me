const chai = require( 'chai');
const chaiHttp =require('chai-http');
const app=require('./server.js');

chai.use(chaiHttp); 
chai.should(); 

describe("array", ()=>{
    describe("GET /issue", ()=>{
        it("This route should return an array of all issue objects ", (done)=>{
            chai.request(app)
            .get('/issue')
            .end((err,res)=>{
               
                res.should.have.status(200);
                
               res.body.should.be.a('array'); 
                done();
            })
        })
    })
})
