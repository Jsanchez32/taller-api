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

//Creamos 2 array vacios para luego llenarlos//
let img = []
let dogs = []
const getDog = async ()=>{
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        //Agregamos los datos del txt al array//
        dogs.push(data)
        //Usando el metodo splip separamos los elementos del array por medio de la ","//
        const dog = dogs[0].split(',') ;

        console.log(dog);
        //Usamos un for para recorrer cada perro y que de esa manera la api lea todos//
        for (let i = 0; i < dog.length; i++) {
            const res = await superagent.get(`https://dog.ceo/api/breed/${dog[i]}/images/random`);
            //Guardamos en el array img las urls de los perros//
            img.push(res.body.message)
            //Usamos el join para q no se remplazen los archivos y el "\n" para que baje una linea de texto//
            await writeFilePro('dog-img.txt', img.join('\n'));            
        }
        console.log(img);

    } catch (error) {
        console.log(error);
    }
}
getDog();