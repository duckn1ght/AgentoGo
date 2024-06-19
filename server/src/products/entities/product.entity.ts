import { AbstractEntity } from 'src/abstractions/abstract.entity';
import { Column, Entity } from 'typeorm';
import { EXP, PROD_STATUS, UNITS } from '../types/products-types';

@Entity()
export class Product extends AbstractEntity<Product> {
  @Column({ name: 'org_id' })
  orgId: string;

  @Column({ name: 'brand_id' })
  brandId: string;

  @Column({ name: 'subcategory_id' })
  subcategoryId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  visibility: boolean;

  @Column({ nullable: true })
  count: number;

  @Column({ nullable: true })
  status: PROD_STATUS;

  @Column({ nullable: true })
  unit: UNITS;

  @Column()
  price: number;

  @Column({ name: 'final_price', nullable: true })
  finalPrice: number;

  @Column({ nullable: true })
  compound: string;

  @Column({ nullable: true })
  country: string;

  @Column({ name: 'exp_date', nullable: true })
  expDate: number;

  @Column({ name: 'exp_type', nullable: true })
  expType: EXP;

  @Column({ nullable: true })
  multiplicity: number;
}
