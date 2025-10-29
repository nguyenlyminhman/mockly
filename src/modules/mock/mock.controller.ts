import { Controller, Get, Post } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('mockly')
export class MockController {

    constructor(private readonly mockService: MockService) { }

    @Post("/timeout")
    callTimeoutData(): Promise<any> {
        return this.mockService.callTimeoutData();
    }

}
