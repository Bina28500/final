import { Injectable } from "@nestjs/common";
const https = require('https');

@Injectable()
export class Repositories{

    private repositories: string[] = [];

    clearRepArray(){
        this.repositories = [];
    }
    fullRepArray(callback){
      let optionsForRep = {host: 'api.github.com', path: '/orgs/nodejs/repos?per_page=100', method: 'GET', headers: {'user-agent': 'node.js'}};
      let requestForRep = https.request(optionsForRep, response =>{ 
        let body = '';
        response.on('data', chunk=>{
            body+=chunk;
        });
        response.on('end', ()=>{
            let json = JSON.parse(body);
            json.forEach(item => {
                this.repositories.push(item.name);
            });
            callback(null, 'repository is full');
        });
      }).end();
        requestForRep.on('error', err=> {
        throw new Error(err);
        });
    }
    getRepNames(){
        return this.repositories;
    }
}
