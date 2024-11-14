import Driver from './Driver';
import { BaseModel, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import OwnerVehicle from './OwnerVehicle';

export default class Owner extends BaseModel {
  
  @hasMany(() => OwnerVehicle, {
    foreignKey: 'owner_id',
  })
  public ownerVehicles: HasMany<typeof OwnerVehicle>;

  // Otros métodos específicos de Owner si es necesario
}
