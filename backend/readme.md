## Structure
```
src -  
    api end point/  
    api end point/  
    .  
    .  
    .  
    main.py  
```

api end points

"/" -> home
"/user/<id>" -> user by id
"/products" -> fetch all products
"/products/<id>" -> fetch by id

websocket end point

ws://localhost:5000  
event:"message"
structure to send to backend
{
    userID:string;
    Context:{
        //session id
        role:string;// role is user
        message:string
    }
}

structure for fronend
{
    userID:string;
    context:{
        role:string; // role is bot
        message:string;
    }
}