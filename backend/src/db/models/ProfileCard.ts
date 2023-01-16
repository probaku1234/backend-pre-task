/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../sequelizeConnect'
import Career from './Career'

interface ProfileCardAttributes {
  id: number
  name: string
  information: Record<string, unknown>
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface ProfileCardInput
  extends Optional<ProfileCardAttributes, 'id'> {}

export interface ProfileCardOutput extends Required<ProfileCardAttributes> {
  careers?: Career[]
}

class ProfileCard
  extends Model<ProfileCardAttributes, ProfileCardInput>
  implements ProfileCardAttributes
{
  public id!: number
  public name!: string
  public information!: Record<string, unknown>
  public careers?: Career[]
  public readonly created_at!: Date
  public readonly updated_at!: Date
  public readonly deleted_at!: Date
}

ProfileCard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    information: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'profile_card',
  }
)

ProfileCard.hasMany(Career, {
  as: 'careers',
})

export default ProfileCard
