
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async CreateAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                await this.login({ email, password });
                await this.delay(500); // <- important delay before getting user
                return await this.getCurrentUser();
            } else {
                return null;
            }
        }catch (e) {
    console.error("Auto signup failed:", e?.message || e);
    
}
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
            await this.delay(500); // <- allow session cookie to persist
            return await this.getCurrentUser();
        } catch (e) {
    console.error("Auto login  failed:", e?.message || e);
    
}
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser", error);
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("logout Service", error);
        }
    }

    delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
}

const authService = new AuthService();

export default authService;
