const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

    americanToBritish(wordsArr){
        
        const puncReg=/\.|\?|\!|\,$/;
        let newArr=[];
        wordsArr.forEach((word,i)=>{
                if(word.toLowerCase() in americanToBritishTitles) newArr.push('<span class=highlight>'+americanToBritishTitles[word.toLowerCase()]+'</span>')
                else if(/\:/.test(word)) newArr.push('<span class=highlight>'+word.split(':')[0]+'.'+word.split(':')[1]+'</span>');
                else if(puncReg.test(word)) {
                    newArr.push(word.split(puncReg)[0]);
                    newArr.push(word.match(puncReg)[0]);
                }
                else newArr.push(word);    
        });

        wordsArr=[...newArr];
        
        const multpWordies= (Object.getOwnPropertyNames(americanOnly)).filter(elem=> elem.indexOf(' ')>0);

        multpWordies.forEach(elem=> { 
            const reg = new RegExp(elem,'i');
            if(reg.test(wordsArr.join(' '))){
                let bufferArr=[];
                let removeIndex;
                
                wordsArr.forEach((word,i)=>{
                    if (elem.split(' ')[bufferArr.length]){
                    if(word.toLowerCase()===(elem.split(' ')[bufferArr.length].toLowerCase())){   
                        bufferArr.push(word);                       
                        if(removeIndex==undefined) removeIndex=i;         
                    }
                 }
                });
                wordsArr.splice(removeIndex,bufferArr.length,bufferArr.join(' '));      
            };              
        });
        
        
        wordsArr.forEach((elem,i) =>  (elem.toLowerCase() in americanOnly) ? 
                                    wordsArr[i]='<span class=highlight>'+americanOnly[elem.toLowerCase()]+'</span>' :   
                                        wordsArr[i]=elem );
        wordsArr.forEach((elem,i)=> (elem.toLowerCase() in americanToBritishSpelling) ?
                                     wordsArr[i]='<span class=highlight>'+americanToBritishSpelling[elem.toLowerCase()]+'</span>':
                                     wordsArr[i]=elem);
        /*wordsArr.forEach((elem,i)=> (elem.toLowerCase() in americanToBritishTitles) ?
                                     wordsArr[i]='<span class=highlight>'+americanToBritishTitles[elem.toLowerCase()]+'</span>':
                                     wordsArr[i]=elem);   */
        wordsArr.forEach((elem,i)=>{     
           if (/\.|\,|\?|\!/.test(elem) && elem.length===1) {
            wordsArr[i-1]+=wordsArr[i];
            wordsArr.splice(i,1);
           }
        })                                         
        
        return (/span/.test(wordsArr.join(' '))?
        wordsArr.join(' ').charAt(0).toUpperCase()+wordsArr.join(' ').slice(1):
        'Everything looks good to me:)'       
        );
        
    }

    britishToAmerican(wordsArr){

        function getKeyFromValue(obj,value){
            return Object.keys(obj).find(key=> obj[key]===value);
        }
        


        const puncReg=/\.|\?|\!|\,$/;
        let newArr=[];
        wordsArr.forEach((word,i)=>{
                
                if(getKeyFromValue(americanToBritishTitles,word.toLowerCase())) newArr.push('<span class=highlight>'+getKeyFromValue(americanToBritishTitles,word.toLowerCase())+'</span>')
                else if(/[0-9]{1,2}\.[0-9]{2}/.test(word)) {
                    
                    newArr.push('<span class=highlight>'+word.split('.')[0]+':'+word.split('.')[1]+'</span>');
                    console.log(newArr);
                }
                else if(puncReg.test(word)) {
                    newArr.push(word.split(puncReg)[0]);
                    newArr.push(word.match(puncReg)[0]);
                }
                else newArr.push(word);
                
        });
        
        wordsArr=[...newArr];
        //console.log(wordsArr);
        const multpWordies= (Object.getOwnPropertyNames(britishOnly)).filter(elem=> elem.indexOf(' ')>0);
        
        multpWordies.forEach(elem=> { 
            const reg = new RegExp(elem,'i');
            if(reg.test(wordsArr.join(' '))){
                let bufferArr=[];
                let removeIndex;
                
                wordsArr.forEach((word,i)=>{
                    if (elem.split(' ')[bufferArr.length]){
                    if(word.toLowerCase()===(elem.split(' ')[bufferArr.length].toLowerCase())){   
                        bufferArr.push(word);                       
                        if(removeIndex==undefined) removeIndex=i;         
                    }
                 }
                });
                wordsArr.splice(removeIndex,bufferArr.length,bufferArr.join(' '));      
            };              
        });

        wordsArr.forEach((elem,i) =>  (elem.toLowerCase() in britishOnly) ? 
                                    wordsArr[i]='<span class=highlight>'+britishOnly[elem.toLowerCase()]+'</span>' :   
                                        wordsArr[i]=elem );
        wordsArr.forEach((elem,i)=>{
            (getKeyFromValue(americanToBritishSpelling,elem.toLowerCase())) ?
                                    wordsArr[i]='<span class=highlight>'+getKeyFromValue(americanToBritishSpelling,elem.toLowerCase())+'</span>' :
                                    wordsArr[i]=elem
        });
        wordsArr.forEach((elem,i)=>{
            
          if (/\.|\,|\?|\!/.test(elem) && elem.length===1) {
            wordsArr[i-1]+=wordsArr[i];
            wordsArr.splice(i,1);
           }
        })
        return (/span/.test(wordsArr.join(' '))?
        wordsArr.join(' ').charAt(0).toUpperCase()+wordsArr.join(' ').slice(1):
        'Everything looks good to me:)'       
        );
    }

    translate (string,locale){

        const wordsArr=string.split(' ');

        switch (locale){
            case 'american-to-british':
            return (this.americanToBritish(wordsArr));
            break;

            case 'british-to-american':
            return (this.britishToAmerican(wordsArr));
            break;

            default:

            break;
        }
    }
}

module.exports = Translator;