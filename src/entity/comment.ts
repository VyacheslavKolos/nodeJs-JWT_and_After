import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';
import { CommonFields } from './commonFields';
import { Post } from './post';

export interface IComments {
    text: string;
    postId: number;
    likes:number;
}

@Entity('comments', { database: 'studynode' })
export class Comment extends CommonFields implements IComments {
    @Column({
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        text: string;

    @Column({
        type: 'int',
    })
        postId: number;

    @Column({
        type: 'int',
    })
        likes: number;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'postId' })
        post: Post;
}
