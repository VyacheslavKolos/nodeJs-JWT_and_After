import Joi from 'joi';
import { commonValidator } from '../common/commonValidator';

// const carSubSchema = Joi.object({ // optional for example
//     model: Joi.string(),
// });

export const authValidator = {
    login:
         Joi.object({
             email: commonValidator.emailValidator.message('Email not valid').trim(),
             password: Joi.string().required().min(5).message('Password not valid')
                 .trim(),
             // cars: Joi.array().items(carSubSchema).min(2).max(90), // optional for example
         }),
};
