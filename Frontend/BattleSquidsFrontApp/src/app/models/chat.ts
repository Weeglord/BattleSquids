import{ Person } from "./person";


export class Chat{
    id: number;
    gameId: number;
    sender: Person ;
    message: string;

    constructor(){
        this.id= -1;
        this.gameId= -1 ;
        this.message= "";
        this.sender = new Person();

    }

    // constructor(id:number,gameId:number,sender:Person,message:string){
    //     this.id=id;
    //     this.gameId=gameId;
    //     this.sender=sender;
    //     this.message=message;
    // }

}
