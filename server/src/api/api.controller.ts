import { All, Controller, NotFoundException } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @All('*')
  all() {
    return new NotFoundException();
  }
}
