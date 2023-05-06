interface Message {
    text: string,
    createAt: admin.firestore.Timestamp,
    user:{
        _id: string;
        name: string;
        avata: string;
    }
}

interface dataRegister {
    username : String,
    password : String,
    email: String
}

interface dataLogin {
    username : String,
    password : String,

}