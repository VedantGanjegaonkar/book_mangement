
import { UserModel } from '../model/user.model';

class userQuery{
    
    public async findByemailAndPassword(email,password){
        return await UserModel.findOne({ email,password });
    }


}
export{userQuery}







// class userQuery{
//     public async findByemail(email){
//         return await User.findOne({ email });
//     }
//     public async findByemailAndPassword(email,password){
//         return await UserModel.findOne({ email,password });
//     }

//     public async createUser(name,email,password){
//         return await User.create({name,email,password})
//     }
//     public async createCart(id,un){
//         return await Cart.create({userID:id,username:un})
//     }

// }
// export{userQuery}