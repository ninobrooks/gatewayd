var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');

describe('fund hot wallet', function(){
  var secret = process.env.COLD_WALLET_SECRET;

  it('should return unauthorized without credentials', function(done){
    request(app)
      .post('/v1/wallets/hot/fund')
      .expect(401)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });
  if(secret){
    it('should return successfully with credentials', function(done){
      this.timeout(10000);
      request(app)
        .post('/v1/wallets/hot/fund')
        .send({ amount: 1, currency: 'SWG', secret: '' })
        .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          done();
        });
    });
  } else {
    it.skip('should return successfully with credentials', function(done){
      this.timeout(10000);
      request(app)
        .post('/v1/wallets/hot/fund')
        .send({ amount: 1, currency: 'SWG', secret: '' })
        .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          done();
        });
    });
  }


});

