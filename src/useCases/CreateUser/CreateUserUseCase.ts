import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider,
    ) {}
  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to:{
        name: data.name,
        email: data.email,
              }, 
              from: {
                name: "Equipe do meu app",
                email: "equipe@meuapp.com",
              },
              subject: 'Seja Bem-vindo à plataforma',
              body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    })
  }
}
