import { Injectable } from '@nestjs/common';
import { UsersService } from '../../models/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      console.log(password);
      console.log('*************');
      console.log(result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
