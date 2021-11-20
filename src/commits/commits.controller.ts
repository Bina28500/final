import { Body, Controller, Get, Post, Render, Res} from '@nestjs/common';
import { Data } from './dto/return-com.dto';
import { Commits } from './commits.service';
const async = require('async');


@Controller()
export class CommitsController{
    constructor(private readonly ComService: Commits){

    }
    @Post('/getCom')
    getComMesOrHash(@Body() com: Data, @Res() res){
        //async series использовался вместо waterfall для масштабируемости приложения, если понадобятся промежуточные результаты
          async.series([
            (callback)=>{
                this.ComService.fullComArray(com.name, callback);
            },
            (callback)=>{
                    let result = this.ComService.returnArray();
                    callback(null, result);
            },
            (callback)=>{
                let final;
                if(com.prop == 'message'){
                    final= this.ComService.getComMes(this.ComService.commits);
                } else{
                    final = this.ComService.getComSha(this.ComService.commits);
                }
                return callback(null, final);
            }
        ], function(err, results){
            if(err){
                throw new Error(err);
            } else{
                console.log(results);
                res.json(results[results.length-1]);
            }
        });
    }
}