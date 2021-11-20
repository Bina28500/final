import { Body, Controller, Get, Post, Render, Res} from '@nestjs/common';
import { Repositories } from './repos.service';
const async = require('async');

@Controller()
export class RepositoryController{
    constructor(private readonly RepService: Repositories){

    }

    @Get('/getRep')
    getRep(@Res() res){
        async.series([
            (callback)=>{
                this.RepService.clearRepArray();
                callback(null, '')
            },
            (callback)=>{
                this.RepService.fullRepArray(callback);
            },
            (callback)=>{
                let result = this.RepService.getRepNames();
                callback(null, result);
            }
        ], (err, results)=>{
            if(err){
                throw new Error(err);
            } else{
                console.log(results);
                res.json(results[results.length-1]);
            }
        })
    }
}