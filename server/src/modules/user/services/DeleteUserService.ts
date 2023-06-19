import { User } from "@user/infra/schema/entities/User";
import { IUserService } from "./IUserService";
import { Repository } from "typeorm";

export class DeleteUserService implements IUserService {
  readonly userRepository: Repository<User>;
  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async execute(user: string): Promise<void> {
    // TODO
  }
}
