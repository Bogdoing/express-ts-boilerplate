export class user {
    
    public id: string;
    
    constructor() {
        this.id = 'USER'
    }
    public getUserId(){
        return this.id;
    }
    public setUserId(id: string){
        this.id = id;
    }
}