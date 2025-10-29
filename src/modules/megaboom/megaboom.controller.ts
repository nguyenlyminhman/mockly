import { Controller, Get } from '@nestjs/common';
import { MegaboomService } from './megaboom.service';

@Controller('megaboom')
export class MegaboomController {

    constructor(private readonly boomService: MegaboomService) { }

    @Get("/yoho")
    getHello(): string {
        return this.boomService.getHello();
    }

}
