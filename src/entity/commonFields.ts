import {
    Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';

export interface ICommonFields{
    id: number;
    createdAt:string;
    deleteAt?:string;
}

export class CommonFields implements ICommonFields {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createdAt:string;

    @Column()
    @DeleteDateColumn({ type: 'timestamp' })
        deleteAt?:string;
}
