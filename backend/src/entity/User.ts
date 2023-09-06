import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Event } from "./Event";
import { Technology } from "./Technology";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({
        name: 'id',
        unsigned: true,
        type: 'int',
        comment: 'ユーザーID',
    })
    readonly id: number;

    @Column('varchar', { length: 256, comment: 'ユーザー名' })
    name: string;

    @Column('varchar', { length: 256, comment: 'メールアドレス' })
    email: string;

    @Column('varchar', { length: 256, comment: '部署' })
    department: string;

    @CreateDateColumn({ comment: '登録日時' })
    readonly created_at?: Timestamp;

    @UpdateDateColumn({ comment: '更新日時' })
    readonly edit_at?: Timestamp;

    @OneToMany(() => Event, (event) => event.user, {
        createForeignKeyConstraints: false,
        persistence: false,
    })
    readonly events?: Event[];

    @ManyToMany(() => Event)
    @JoinTable()
    reservation?: Event[]

    @ManyToMany(() => Event)
    @JoinTable()
    speaker?: Event[]

    @ManyToMany(() => Technology)
    @JoinTable()
    can_use?: Technology[]
}
