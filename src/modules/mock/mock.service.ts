import { Injectable } from '@nestjs/common';

@Injectable()
export class MockService {

    async callTimeoutData(): Promise<any> {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        return 'Hello AWS S3!';
    }

}
