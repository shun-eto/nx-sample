import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodbConnection,
  rootMongooseTestModule,
} from '../../test-utils/mongo/MongooseTestModule';
import { MongooseModule } from '@nestjs/mongoose';
import { AdDocument, AdSchema } from './ad.schema';
import { Model } from 'mongoose';
import { AttendeeDocument, AttendeeSchema } from './attendee.schema';
import { ExhibitionsDocument, ExhibitionsSchema } from './exhibition.schame';
import { EventDocument, EventSchema } from './event.schema';
import { Tenant, TenantDocument, TenantSchema } from './tenant.schema';
import { User, UserDocument, UserSchema } from './user.schema';

describe.only('MongooseModelTest', () => {
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'ad', schema: AdSchema },
          { name: 'attendee', schema: AttendeeSchema },
          { name: 'exhibitions', schema: ExhibitionsSchema },
          { name: 'event', schema: EventSchema },
          { name: Tenant.name, schema: TenantSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
    }).compile();
  });

  afterAll(async () => {
    await closeInMongodbConnection();
  });

  const eventId = '61fa17ade622c102f8d789f9';

  it('ad', async () => {
    const model = module.get<Model<AdDocument>>('adModel');
    const createModel = new model({
      event: eventId,
      patterns: [{ showTableMap: false, showTable: false }],
    });
    await createModel.save();
    const result = await model.find();
    expect(result[0].event.toString()).toBe(eventId);
    expect(result[0].patterns[0].showTableMap).toBeFalsy();
    expect(result[0].patterns[0].showTable).toBeFalsy();
  });

  it('attendee', async () => {
    const model = module.get<Model<AttendeeDocument>>('attendeeModel');
    const data = {
      fullName: 'attendee1',
      email: 'UpperCaseToLowerCase@test.com',
      picture: 'https://picture.com',
      links: {
        facebook: 'https://www.facebook.com/test',
      },
      event: eventId,
      alternateId: '',
      connections: [
        {
          participantId: '61fa17ade622c102f8d789f0',
          role: 'attendee',
          status: 'requested',
          connectedAt: Date.now(),
        },
      ],
    };
    const createModel = new model(data);
    await createModel.save();
    const result = await model.find();
    expect(result[0].fullName).toBe(data.fullName);
    expect(result[0].email).toBe(data.email.toLowerCase());
    expect(result[0].picture).toBe(data.picture);
    expect(result[0].status).toBe('active');
    expect(result[0].registeredBy).toBe('organizer');
    expect(result[0].links.facebook).toBe(data.links.facebook);
    expect(result[0].links?.twitter).toBeUndefined();
    expect(result[0].alternateId).not.toBeUndefined();
    expect(result[0].connections.length).toBe(1);
    expect(result[0].code).toBeDefined();
    expect(result[0]?.toObject).toBeDefined();
    expect(result[0]?.toJSON).toBeDefined();
  });

  it('event', async () => {
    const model = module.get<Model<EventDocument>>('eventModel');
    const data = {
      type: 'type',
      title: 'test',
      floors: [
        {
          name: 'floor1',
          tables: [
            {
              tableName: 'table1',
              size: 4,
              documents: [],
              hosts: [],
            },
          ],
        },
        {
          name: 'floor2',
          tables: [
            {
              tableName: 'table2',
              size: 4,
              documents: [],
              hosts: [],
            },
          ],
        },
      ],
    };
    const createModel = new model(data);
    await createModel.save();
    const r = await model.find();
    const result = r[0];
  });
  it('exhibition', async () => {
    const model = module.get<Model<ExhibitionsDocument>>('exhibitionsModel');
    const data = {
      event: eventId,
      table: '61fa17ade622c102f8d789f1',
      media: [
        {
          type: 'test1',
          title: 'exhibition',
          value: 'value',
          youtubeId: 'https://youtube.com',
          videoSrc: 'vimeo',
        },
        {
          type: 'test1',
          title: 'exhibition',
          value: ['value1', 'value2'],
          youtubeId: 'https://youtube.com',
          videoSrc: 'vimeo',
        },
      ],
    };
    const createModel = new model(data);
    await createModel.save();
    const result = await model.find();
    expect(result[0].event.toString()).toBe(eventId);
    expect(result[0].table.toString()).toBe(data.table);
    expect(result[0].media[0].type).toBe(data.media[0].type);
    expect(result[0].media[0].value).toBe(data.media[0].value);
    expect(result[0].media[1].value).toStrictEqual(data.media[1].value);
  });

  it('tenant', async () => {
    const model = module.get<Model<TenantDocument>>(`${Tenant.name}Model`);
    const data = {
      key: 'key',
      name: 'testTenant',
      saml: {
        provider: 'provider',
        providerConfig: {
          entryPoint: 'entry',
        },
      },
    };
    const createModel = new model(data);
    await createModel.save();
    const r = await model.find();
    const result = r[0];
    expect(result._id).not.toBeUndefined();
    expect(result.key).toBe(data.key);
    expect(result.name).toBe(data.name);
    expect(result.saml.provider).toBe(data.saml.provider);
    expect(result.saml.providerConfig.entryPoint).toBe(
      data.saml.providerConfig.entryPoint
    );
  });

  describe('user', () => {
    it('insert and find', async () => {
      const model = module.get<Model<UserDocument>>(`${User.name}Model`);
      const data = {
        email: 'test@vcube.com',
        name: 'test',
        picture: 'https://abc.com',
        local: {
          name: 'localUser',
          password: 'abc',
        },
        google: {
          id: 'googleId',
          name: 'localUser',
        },
        facebook: {
          id: 'facebookId',
          name: 'localUser',
        },
        saml: {
          id: 'samlId',
          name: 'localUser',
        },
        alternateId: 'alter',
      };
      const createModel = new model(data);
      await createModel.save();
      const r = await model.find();
      const result = r[0];
      expect(result._id).not.toBeUndefined();
      expect(result.email).toBe(data.email);
      expect(result.alternateId).toBe(data.alternateId);
      expect(result.name).toBe(data.name);
      expect(result.picture).toBe(data.picture);
      expect(result.local.name).toBe(data.local.name);
      expect(result.google.id).toBe(data.google.id);
      expect(result.facebook.id).toBe(data.facebook.id);
      expect(result.saml.id).toBe(data.saml.id);
    });

    // populate 要調査
    // it('find with tenant', async () => {
    //   const tenantModel = module.get<Model<TenantDocument>>(
    //     `${Tenant.name}Model`,
    //   );
    //   const tenantData = {
    //     key: 'key',
    //     name: 'testTenant',
    //     saml: {
    //       provider: 'provider',
    //       providerConfig: {
    //         entryPoint: 'entry',
    //       },
    //     },
    //   };
    //   const createTenantModel = new tenantModel(tenantData);
    //   await createTenantModel.save();
    //   const r = await tenantModel.find();
    //   const tenantId = r[0]._id;
    //
    //   const model = module.get<Model<UserDocument>>(`${User.name}Model`);
    //   const data = {
    //     email: 'test2@vcube.com',
    //     name: 'test2',
    //     picture: 'https://abc.com',
    //     local: {
    //       name: 'localUser',
    //       password: 'abc',
    //       activateToken: '',
    //       resetPasswordToken: '',
    //     },
    //     tenant: tenantId,
    //   };
    //   const createModel = new model(data);
    //   await createModel.getSignUpUrl('');
    //   const insertedData = await createModel.save();
    //   const dataWithTenant = await model
    //     .findById(insertedData._id.toString())
    //     .populate('tenant')
    //     .exec();
    //   console.log(dataWithTenant);
    //   expect(dataWithTenant.email).toBe(data.email);
    //   expect(dataWithTenant.tenant._id.toString()).toBe(tenantId.toString());
    // expect(dataWithTenant[0].tenant?.name).toBe(tenantData.name);
    // expect(dataWithTenant[0].tenant?.name).toBe(tenantData.name);
    // });
  });
});
