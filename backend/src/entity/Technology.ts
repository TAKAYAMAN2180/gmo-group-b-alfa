import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Timestamp, ManyToMany, JoinTable, OneToMany, JoinColumn } from "typeorm"

@Entity('technologies')
export class Technology {
    @PrimaryGeneratedColumn({
        name: 'id',
        unsigned: true,
        type: 'int',
        comment: '技術ID',
    })
    readonly id: number;

    @Column('varchar', { length: 256, comment: '技術名' })
    name: string;

    @CreateDateColumn({ comment: '登録日時' })
    readonly created_at?: Timestamp;

    @UpdateDateColumn({ comment: '更新日時' })
    readonly edit_at?: Timestamp;
}
