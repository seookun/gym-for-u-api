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
      throw new HttpError(400, `Cast to ObjectId failed for value ${_id}`);
    }

    return await this.findGym({ _id });
  }

  async createGym(req: CreateGymRequest) {
    if (await GymModel.exists({ name: req.name })) {
      throw new HttpError(409, 'An gym with this name already exists.');
    }

    await new GymModel(req).save();
  }

  private async findGym(query: FilterQuery<Gym>) {
    const gym = (await GymModel.findOne(query))?.toJSON();

    if (!gym) {
      throw new HttpError(404, 'Gym not found.');
    }

    return gym;
  }
}
