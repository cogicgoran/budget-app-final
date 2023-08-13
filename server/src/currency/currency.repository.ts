import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class CurrencyRepository {
    constructor(private readonly dbService: DatabaseService){}

    getCurrencies() {
        const sql = `SELECT * FROM currencies`;
        return this.dbService.client.query(sql);
    }
}