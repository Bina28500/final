import { Body, Controller, Get, Post, Render, Res} from '@nestjs/common';
import { Data } from './dto/return-rep.dto';
import { Repositories } from './repos.service';
const async = require('async');

@Controller()
export class RepositoryController{
    constructor(private readonly RepService: Repositories){

    }

    @Post('/getRep')
    getRep(@Body() rep: Data, @Res() res){
        async.series([
            (callback)=>{
                this.RepService.clearRepArray();
                callback(null, '')
            },
            (callback)=>{
                this.RepService.fullRepArray(callback);
            },
            (callback)=>{
                this.RepService.getRepNames();
                callback(null, this.RepService.repositories);
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