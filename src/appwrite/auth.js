import conf from "../conf/conf"
import {Client,Account,ID} from "appwrite"

export class AuthService{
    client =new Client();
    account;
    constructor(){
        this.client 
           .setEndpoint(conf.appwriteUrl)
           .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }
    async CreateAccount({email,password,name}){
        try{
        const userAccount = await this.account.create(ID.unique(), email, password, name)

          if(userAccount){
            //if user exists 
            this.login({email,password});
          }
          else{
            return userAccount;
          }
        }
        catch(e){
            throw e;

        }

    }
    async login({email,password}){
        try{
            await this.account.createEmailPasswordSession(email,password);

        }
        catch(error){
            throw error;
        }

        
    }
    async getCurrentUser(){
        try {
             return await this.account.get()//if account exists get it
            
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser",error);
        }
        return null;
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
            
        } catch (error) {
            console.log("logout Service",error);

            
        }
    }

}
const authService=new AuthService();

export default authService;