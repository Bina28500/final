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
          async.waterfall([
            (callback)=>{
                this.ComService.fullComArray(com.name, callback);
            },
            (arg1, callback)=>{
                    let result = this.ComService.returnArray();
                    callback(null, result);
            },
            (arg1, callback)=>{
                let final;
                if(com.prop == 'message'){
                    final= this.ComService.getComMes(arg1);
                } else{
                    final = this.ComService.getComSha(arg1);
                }
                 callback(null, final);
            }
        ], function(err, result){
            if(err){
                throw new Error(err);
            } else{
                console.log(result);
                res.json(result);
            }
        });
    }
}