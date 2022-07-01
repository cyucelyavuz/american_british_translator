const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

    test('Translation with text and locale fields', done=>{
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                text:'Mangoes are my favorite fruit.',
                locale:'american-to-british'
            })
            .end((err,res)=>{
                //console.log(res);
                assert.equal(res.body.translation,'Mangoes are my <span class=\"highlight\">favourite</span> fruit.');
                done()
            })
    })

    test('Translation with text and invalid locale field', done=>{
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                text:'Mangoes are my favorite fruit.',
                locale:'invalid-locale'
            })
            .end((err,res)=>{
                //console.log(res);
                assert.equal(res.body.translation,'Invalid Translation Locale');
                done()
            })
    })

    test('Translation with missing text field', done=>{
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                locale:'american-to-british'
            })
            .end((err,res)=>{
                //console.log(res);
                assert.equal(res.body.error,'Required field(s) missing');
                done()
            })
    })

    test('Translation with missing locale field', done=>{
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                text:'Mangoes are red'
            })
            .end((err,res)=>{
                //console.log(res);
                assert.equal(res.body.error,'Required field(s) missing');
                done()
            })
    })

    test('Translation with empty text', done=>{
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                text:'',
                locale:'american-to-british'
            })
            .end((err,res)=>{
                //console.log(res);
                assert.equal(res.body.error,'No text to translate');
                done()
            })
    })

    test('Translation with text that needs no translation', done=>{
        chai.request(server)
            .post('/api/translate')
            .type('form')
            .send({
                text:'Prof Joyner of King\'s College, London.',
                locale:'american-to-british'
            })
            .end((err,res)=>{
                //console.log(res);
                assert.equal(res.body.translation,'Everything looks good to me!');
                done()
            })
    })
});
