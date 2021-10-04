const assert = require('assert');
const app = require('../../src/app');

describe('\'dishes\' service', () => {
  it('registered the service', () => {
    const service = app.service('dishes');

    assert.ok(service, 'Registered the service');
  });
});
