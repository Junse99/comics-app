  export const schema = {
    title: [ {
      required: true,
      min: 3,
      max: 20
    } ],
    id: [ {
      required: true,
      // type: 'regexp',
      pattern: new RegExp(/^([0-9])*$/),
      message: 'Sólo números'
    } ],
    description: [ {
      required: true,
      min: 3,
      max: 50
    } ],
    path: [ {
      required: true,
    } ],
    extension: [ {
      required: true
    } ]
  };
  
  export const messages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
      regexp: '${label}: sólo números'
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };