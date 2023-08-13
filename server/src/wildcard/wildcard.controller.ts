import { All, Controller, NotFoundException } from '@nestjs/common';

@Controller('api')
export class WildcardController {
  @All('*')
  matchAll() {
    throw new NotFoundException();
  }
}
