import { HttpError } from 'routing-controllers';
import { isMongoId } from 'class-validator';
import { FilterQuery } from 'mongoose';
import GymModel, { Gym } from '@/models/GymModel';
import { CreateGymRequest } from '@/dtos/GymDto';

export default class GymService {
  async findGyms(query: FilterQuery<Gym>) {
    return (await GymModel.find(query)).flatMap((doc) => doc.toJSON());
  }

  async findGymById(_id: string) {
    if (!isMongoId(_id)) {
      throw new HttpError(400, `${_id}는 잘못된 ObjectId 입니다. `);
    }

    return await this.findGym({ _id });
  }

  async createGym(req: CreateGymRequest) {
    if (await GymModel.exists({ name: req.name })) {
      throw new HttpError(409, '이미 존재하는 이름이 있습니다.');
    }

    await new GymModel(req).save();
  }

  private async findGym(query: FilterQuery<Gym>) {
    const gym = (await GymModel.findOne(query))?.toJSON();

    if (!gym) {
      throw new HttpError(404, '요청하신 정보를 찾을 수 없습니다.');
    }

    return gym;
  }
}
