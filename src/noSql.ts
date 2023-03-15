import { database } from "./database"

class noSql implements database{
    saveData(data: any): string {
        return "hello"
    }
}