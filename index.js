const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file =>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,'utf-8',(err,data)=>{
            if(err) reject('I could not find that file');
            resolve(data);
        })
    })
}

const writeFilePro = (file,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,err=>{
            if(err) reject('Could not write file');
            resolve('succes')
        })
    })
}

let img = []
let dogs = []
const getDog = async ()=>{
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        dogs.push(data)
        const dog = dogs[0].split(',') ;

        console.log(dog);
        for (let i = 0; i < dog.length; i++) {
            const res = await superagent.get(`https://dog.ceo/api/breed/${dog[i]}/images/random`);
            img.push(res.body.message)
            await writeFilePro('dog-img.txt', img.join('\n'));            
        }
        console.log(img);

    } catch (error) {
        console.log(error);
    }
}
getDog();