import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

// import {filter} from 'lodash';

import schema from './schema';

function isObjectMatchedToFilter<T> (obj: T, filter: T) : boolean {
  let ans: boolean = true;
  Object.keys(filter).forEach(key => {
      if((typeof obj[key] === 'string' 
        && typeof filter[key] === 'string' 
        && obj[key] !== filter[key])
        || (typeof obj[key] === 'number' 
        && typeof filter[key] === 'number'  
        && obj[key] !== filter[key]) 
      ) {
        ans = false;
      }
      else {
        if (typeof obj[key] === 'object' && 
            isObjectMatchedToFilter(obj[key], filter[key]) === false)
            ans = false;
      }
    });
  return ans;
}

const getFilteredUsers: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  let users: IUser[] = event.body.users;
  users = users.map((user, i) => {user.id = i; return user;});
  const filterObj: IUserFilterObject = event.body.filter;
  // const filteredUsers: IUser[] = filter(users, filterObj as IUser);
  const filteredUsers: IUser[] = users.filter((user) => isObjectMatchedToFilter<IUser>(user, filterObj as IUser));

  return formatJSONResponse({
    filteredUsers: filteredUsers,
    // event,
  });

  
  

}

export const main = middyfy(getFilteredUsers);
