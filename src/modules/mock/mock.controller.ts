import { Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockResponse } from './../../common/response.helper';

@Controller('/mockly')
export class MockController {

    constructor(private readonly mockService: MockService) { }

    @Post("/timeout")
    @HttpCode(HttpStatus.ACCEPTED)
    async callTimeoutData(){
        const data = await this.mockService.callTimeoutData();        
        return MockResponse.success(data, "yo", HttpStatus.ACCEPTED);
    }

}
