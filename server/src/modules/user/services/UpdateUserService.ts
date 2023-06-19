import { UpdateUserDTO } from "@user/infra/dtos/UpdateUserDTO";
import { IUserService } from "./IUserService";
import { Repository } from "typeorm";
import { User } from "@user/infra/schema/entities/User";

export class UpdateUserService implements IUserService {
  readonly userRepository: Repository<User>;
  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async execute(user: UpdateUserDTO): Promise<void> {
    // TODO
  }
}
