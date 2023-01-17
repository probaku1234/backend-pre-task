/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../sequelizeConnect'

interface CareerAttributes {
  id: number
  information: Record<string, unknown>
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

export interface CareerInput extends Optional<CareerAttributes, 'id'> {}

export interface CareerOutput extends Required<CareerAttributes> {}

class Career
  extends Model<CareerAttributes, CareerInput>
  implements CareerAttributes
{
  public id!: number
  public information!: Record<string, unknown>

  public readonly created_at!: Date
  public readonly updated_at!: Date
  public readonly deleted_at!: Date
}

Career.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    information: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {
        start_date: '',
        company_name: '',
        end_date: '',
        position: '',
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'career',
  }
)

export default Career
