'use strict';
import Axios from 'axios';
import Path from 'path';
import { spawn } from 'child_process';
import { Console } from 'console';
import dotenv from 'dotenv';

const ObterPagina = async (url='') => (await Axios.get(url)).data;

const ObterLinks = (htmlRaw='') => htmlRaw.match(/http.*\.zip/g);

const BaixarArquivos = (urlsFiles=[], path = './files') => {
    let args = ['-c','-l','2', '-P', path];  
    urlsFiles.map(link => args.push(link)); 
    return spawn('wget', args); 
}

const Main = async () => {
    dotenv.config();
    const pathBase = Path.resolve()
    const paginaWeb = await ObterPagina(process.env.URL);
    if (paginaWeb != null && paginaWeb != '') {
        const listaDeArquivoParaBaixar = ObterLinks(paginaWeb);
        if (listaDeArquivoParaBaixar != null) {
            const wget = BaixarArquivos(listaDeArquivoParaBaixar, Path.join(pathBase, 'files'));
            var buff = [];//buffer para apresentação do console
            wget.stdout.setEncoding('utf-8');
            wget.stdout.on('data', (data) => {
                console.log(data);
            });
            wget.stderr.setEncoding('utf-8');
            wget.stderr.on('data', (data) => {
                buff.length <= 150 ? buff.push(data) : buff = []
                if (buff.length >= 100) {
                    console.log(buff.reduce((x, y) => x + y, ''))
                }
            });
            return 0;
        } else {
            Console.log("Sem arquivos para baixar! :( ");
            return 1;
        }        
    }
    console.log(`Status ${result.status}`);
    return 1;
}
Main();
