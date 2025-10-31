import { Body, Controller, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockResponse } from './../../common/response.helper';
import { User } from 'src/decorator/user.decorator';

@Controller('/mockly')
export class MockController {

    constructor(private readonly mockService: MockService) { }

    @Post("/timeout")
    @HttpCode(HttpStatus.ACCEPTED)
    async callTimeoutData(@User() user: any, @Body() body: any) {
        console.log('user', user);
        console.log('body', body);
        const data = await this.mockService.callTimeoutData();        
        return MockResponse.success(data, "yo", HttpStatus.ACCEPTED);
    }

}
