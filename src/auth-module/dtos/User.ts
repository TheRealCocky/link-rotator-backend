import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MinLength(3, { message: 'O username deve ter no mínimo 3 caracteres' })
  @MaxLength(20, { message: 'O username deve ter no máximo 20 caracteres' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(50, { message: 'A senha deve ter no máximo 50 caracteres' })
  // Exemplo: ao menos uma letra e um número
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/, {
    message: 'A senha deve conter pelo menos uma letra e um número'
  })
  password: string;
}

export class UpdateUserDTO {
  username?: string;
  password?: string;
}
