import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class DatabaseService {
  client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      connectionString: this.configService.getOrThrow('DATABASE_URL'),
    });
    this.client.connect((err) => {
      if (err) {
        console.log('Database connection failed', err);
        process.exitCode = 0;
      }
    });
  }
}
