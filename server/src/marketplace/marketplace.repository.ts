import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class MarketplaceRepository {
    constructor(private readonly dbService: DatabaseService) {}

    getAllMarketplaces() {
        return this.dbService.client.query('SELECT * FROM marketplaces');
    }
}