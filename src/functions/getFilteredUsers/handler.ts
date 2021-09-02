import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import {filter} from 'lodash';

import schema from './schema';

const getFilteredUsers: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let users: IUser[] = event.body.users;
  users = users.map((user, i) => {user.id = i; return user;});
  let filterObj: IUserFilterObject = event.body.filter;
  let filteredUsers: IUser[] = filter(users, filterObj as IUser);

  return formatJSONResponse({
    filteredUsers: filteredUsers,
    // event,
  });
}

export const main = middyfy(getFilteredUsers);
