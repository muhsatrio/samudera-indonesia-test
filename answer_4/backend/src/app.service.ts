import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable } from 'rxjs';
import { UserVO } from './vo/user.vo';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService
  ) {}

  getHello() {
    return {
      message: 'Hello World!'
    };
  }

  async getRandomUsers(result: string, page: string) {
    const responseObserver = this.httpService.get(`https://randomuser.me/api?results=${result}&page=${page}`);

    const { data } = await firstValueFrom(responseObserver);

    const userVOs: UserVO[] = [];

    data.results.forEach(eachData => {
      userVOs.push({
        name: `${eachData.name.title} ${eachData.name.first} ${eachData.name.last}`,
        location: `${eachData.location.street.number}, ${eachData.location.street.name}, ${eachData.location.city}, ${eachData.location.state}, ${eachData.location.country}`,
        email: eachData.email,
        age: eachData.dob.age,
        phone: eachData.phone,
        cell: eachData.cell,
        picture: [eachData.picture.large, eachData.picture.medium, eachData.picture.thumbnail]
      })
    });

    return userVOs;
  }
}
