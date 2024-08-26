import { eq } from "drizzle-orm";
import { UserSchema } from "../schemas/user.schema";
import { Database } from "../utils/db";




export class UserModel {
    constructor(private database: Database) {
    }

    public async getUserByEmail(email: string) {
        const res = await this.database.select().from(UserSchema).where(eq(UserSchema.email, email));
        if(res.length > 0) {
            return res[0]
        }
        return null
    }



}