import { ExpressHandler } from '../../interfaces/express_types'
import { IUserDAO } from '../user/user_dao';


interface IProfileController {
}

// interface LoginProps {
//     email: string;
//     password: string;
// }

export class ProfileController implements IProfileController {


    constructor() { }


    handleProfile: ExpressHandler<void> = (req, res) => {
        res.json(req.session)
    }
}
