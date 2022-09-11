import { emailActionEnum } from './enums';

export const emailInfo = {
    [emailActionEnum.WELCOME]: {
        subject: 'Welcome to KolosOk',
        html: 'Hello this is KolosOk',
    },

    [emailActionEnum.ACCOUNT_BLOCKED]: {
        subject: 'Your account was blocked',
        html: 'OOps account was blocked',
    },
};
