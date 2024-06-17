import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/users/entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async saveProfilePicture(id: string, fileUrl: string) {
    const organization = await this.organizationRepository.findOne({
      where: {
        id: id
      }
    });
    if (organization) {
      organization.imgUrl = fileUrl;
      await this.organizationRepository.save(organization);
    }
  }
}
