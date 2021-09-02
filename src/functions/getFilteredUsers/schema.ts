export default {
  type: 'object',
  properties: {
    users: { 
      type: 'array',
      items: { 
        type: 'object',
        properties: {
          firstName: { type:  'string'}, 
          lastName: { type:  'string'}, 
          age: { type:  'number'} 
        },
        required: ['firstName', 'lastName', 'age']
      }
    },
    filter: { 
      type: 'object',
      properties: {
        firstName: { type:  'string'}, 
        lastName: { type:  'string'}, 
        age: { type:  'number'} 
      }
    }
  },
  required: ['users']
} as const;
