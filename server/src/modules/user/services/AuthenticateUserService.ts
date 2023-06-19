import { AuthenticateUserDTO } from "@user/infra/dtos/AuthenticateDTO";

export class AuthenticateUserService {
  async execute({ username, password }: AuthenticateUserDTO) {
    // const userRepository = await getDataSource().then((dataSource) => dataSource.getMongoRepository(User));
    // const searchedUser = await userRepository.find({
    //   where: {
    //     username: username,
    //     password: password
    //   }
    // })
    // if (searchedUser.length > 0) {
    //   return true;
    // }
    // return false;
    return { user: {}, token: '' };
  }
}
