import { Injectable } from "@nestjs/common";
const https = require('https');

@Injectable()
export class Commits{

    private commits: {message: string, sha: string}[] = [];

    fullComArray(reposName, callback){
    let optionsForCom = {host: 'api.github.com', path: `/repos/nodejs/${reposName}/commits?per_page=25`, method: 'GET', headers: {'user-agent': 'node.js'}};
      let requestForCom = https.request(optionsForCom, response=>{ 
        let body = '';
        response.on('data', chunk=>{
            body+=chunk;
        });
        response.on('end', ()=>{
            let json = JSON.parse(body);
            json.forEach(item => {
               this.commits.push({'message': item.commit.message, 'sha': item.sha});
            });
            callback(null, this.commits);
        });
      }).end();
        requestForCom.on('error', err=> {
        throw new Error(err);
        });
    }
    returnArray(){
        return this.commits;
    }
    getComMes(array){
        let result = array.map(item=>{
            return item.message;
        });
        if(array.length > 25){
            result.length = 25;
        }
        return result;
    }
    getComSha(array){
        let result = array.map(item=>{
            return item.sha;
        });
        if(array.length > 25){
            result.length = 25;
        }
        return result;
    }
}

