import { Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { MockService } from './mock.service';
import { Response } from 'express';
import { MockResponse } from 'src/common/response.helper';

@Controller('/mockly')
export class MockController {

    constructor(private readonly mockService: MockService) { }

    @Post("/timeout")
    async callTimeoutData(){
        const data = await this.mockService.callTimeoutData();        
        return MockResponse.success(data, "yo", HttpStatus.ACCEPTED);
    }

}
