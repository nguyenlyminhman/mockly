import { Injectable } from '@nestjs/common';

@Injectable()
export class MegaboomService {

    getHello(): string {
        return 'Hello AWS S3!';
    }

}
