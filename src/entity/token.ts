import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields, ICommonFields } from './commonFields';
import { User } from './user';

export interface IToken extends ICommonFields{
    refreshToken: string;
    accessToken:string;
    userId: number;
}

@Entity('tokens', { database: 'studynode' })
export class Token extends CommonFields implements IToken {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        refreshToken: string;

    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        accessToken: string;

    @Column({
        type: 'int',
    })
        userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
        user: User;
}
