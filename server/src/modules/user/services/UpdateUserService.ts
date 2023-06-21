import { UpdateUserDTO } from '@user/infra/dtos/UpdateUserDTO';
import { IUserService } from './IUserService';
import { Repository } from 'typeorm';
import { User } from '@user/infra/schema/User';
import { ObjectId } from 'mongodb';

export class UpdateUserService implements IUserService {
  private readonly acceptedFields = [
    'name',
    'username',
    'password',
    'updated_at',
  ];
  readonly userRepository: Repository<User>;
  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async execute(user: UpdateUserDTO): Promise<User> {
    if (!user.id) throw new Error('User id is required');
    const id = new ObjectId(user.id);
    delete user.id;

    const keys = Object.keys(user);
    if (keys.length === 0) throw new Error('No data to update');

    const isValidField = keys.every(key => this.acceptedFields.includes(key));
    if (!isValidField) throw new Error('Invalid field');

    await this.checkIfUserExists(id);

    const update_at = new Date();
    const userToUpdate = await this.findUser(id);

    this.userRepository.merge(userToUpdate, {
      ...user,
      update_at,
    });
    return await this.userRepository.save(userToUpdate);
  }
  private async checkIfUserExists(id: ObjectId): Promise<void> {
    const user = await this.userRepository.findOne({ where: { _id: id } });
    if (user) {
      throw new Error('User already exists');
    }
  }
  private async findUser(_id: ObjectId): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { _id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
