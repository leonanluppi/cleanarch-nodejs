import { v4 as uuid } from 'uuid';

const isEntity = <T>(v: Entity<T>): v is Entity<T> => {
  return v instanceof Entity
}

export default abstract class Entity<T> {

  protected readonly _id: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : uuid();
    this.props = props;
  }

	public get id(): uuid {
		return this._id.toString();
	}

	public static validate(props: unknown) {}

	public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!isEntity(object)) {
      return false
    }

    return this._id == object._id
  }
}
