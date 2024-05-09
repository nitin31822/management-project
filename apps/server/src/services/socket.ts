import { Server, Socket } from "socket.io";
import { INotification, RedisService } from "./redis";



export interface message{
  content:string,
  roomName:string
  sender:user
}

interface user{
  name:string
  avatar:string|null
  id:string
  
}
export interface Task {
  content: string;
  Manager: user;
  // LastDate: Date;
  employee: user;
  title: string;
} 

class SocketService {
  private _io: Server;
  private redisPubSub : RedisService

  constructor() {
   
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
      
    this.redisPubSub = new RedisService(this.io)
    console.log("init Socket Server...");

   
  }



  public initializeSocketEvents() {
    const io = this.io;
 
    io.on("connect", (socket: Socket) => {
      console.log(`New Socket connected ${socket.id}`);

      socket.on("joinRoom", (roomName : string  , callback:Function)=>{
        this.joinRoom(socket , roomName  )
        callback({
          status : true ,
          
        })
      })

      socket.on(
        "sendtask",
        async (roomName: string, task: Task, callback: Function) => {
          await this.redisPubSub.publishTaskToRoom(roomName, task);
          callback({
            status: true,
          });
        }
      );

     

      socket.on("sendMessage",async(roomName:string,Message:message ,callback:Function)=>{
        await this.redisPubSub.publishToRoom(roomName,Message)

        callback({
          status:true
        })
      })
      socket.on("sendNotification",async(roomName:string,Notification:INotification,callback:Function)=>{
        await this.redisPubSub.publishNotificationToRoom(roomName,Notification )

        callback({
          status:true
        })
      })
      

    });
    
    console.log("InIt Socket Listners");
    
  }

  private async joinRoom(socket : Socket , roomName : string ):Promise<void>{
     await this.redisPubSub.subscribeToRoom(roomName)
    socket.join(roomName)

    this.io.to(roomName).emit("userjoined" , `new SocketID emit ${socket.id}` ) 
    console.log(` socketid is  ${socket.id} joined room: ${roomName}`);
}

  get io() {
    return this._io;
  }
}

export { SocketService };
