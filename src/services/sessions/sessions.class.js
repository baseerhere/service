const { Service } = require('feathers-mongodb');

exports.Sessions = class Sessions extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('sessions');
    });
  }

  getLatestId = async () => {
    try {
      const maxItem = await this.Model.find({}).sort({ sessionId: -1 }).limit(1).toArray();
      const maxSessionId = maxItem[0].sessionId;
      return parseInt(maxSessionId) + 1;
    } catch (err) {
      return 1;
    }
  }

  async create(data, params) {
    let latestSessionId = await this.getLatestId();
    const sessionItem = {
      sessionId: latestSessionId,
      sessionStart: new Date(),
      sessionStatus: 'inOrder'
    };

    const createdSession = await this.Model.insertOne(sessionItem);
    return createdSession.ops[0];
  }
};
