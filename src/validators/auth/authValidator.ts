import { Segments } from 'celebrate';
import Joi from 'joi';
import { commonValidator } from '../common/commonValidator';

// const carSubSchema = Joi.object({ // optional for example
//     model: Joi.string(),
// });

export const authValidator = {
    login: {
        [Segments.BODY]: Joi.object({
            email: commonValidator.emailValidator,
            password: Joi.string().required().min(5),
            // cars: Joi.array().items(carSubSchema).min(2).max(90), // optional for example
        }),
    },
};
