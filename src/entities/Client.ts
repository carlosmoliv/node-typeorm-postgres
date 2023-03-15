import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Banker } from "./Banker";
import { Person } from "./common/Person";
import { Transaction } from "./Transaction";

@Entity("clients")
export class Client extends Person {
  @Column({
    type: "numeric",
  })
  balance: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: "simple-json", nullable: true })
  additional_info: {
    age: number;
    occupation: string;
  };

  @Column({ type: "simple-array", default: [] })
  family_members: string[];

  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];

  @ManyToMany(() => Banker, { cascade: true })
  bankers: Banker[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
