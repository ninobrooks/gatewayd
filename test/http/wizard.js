var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');
var assert = require('assert');


describe('set configuration profile', function(){

  function findError(errors, field) {
    var errorFound;
    errors.forEach(function(error){
      if (error.field === field) {
        errorFound = error;
      }
    });
    return errorFound;
  }

  it('should return successfully with valid configuration', function(done){
    request(app)
      .post('/v1/config/wizard')
      .send( {
          config: {
            database_url: 'postgres://postgres:password@localhost:5432/ripple_gateway',
            ripple_rest_url: 'http://localhost:5990/v1',
            ripple_address: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
            currencies: {
              SWD: 0
            }
          }
        }
      )
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });

  it('should return error with no database_url', function(done){
    request(app)
      .post('/v1/config/wizard')
      .send( {
        config: {
          ripple_rest_url: 'https://localhost:5990/v1',
          ripple_address: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
          currencies: {
            SWD: 110
          }
        }
      }
    )
      .expect(400)
      .end(function(err, res){
        assert(findError(res.body.errors, 'database_url'));
        assert(findError(res.body.errors, 'database_url').message == 'please provide a valid database_url');
        if (err) throw err;
        done();
      });
  });

  it('should return error with no currencies', function(done){
    request(app)
      .post('/v1/config/wizard')
      .send( {
        config: {
          database_url: 'postgres://postgres:password@localhost:5432/ripple_gateway',
          ripple_rest_url: 'http://localhost:5990/v1',
          ripple_address: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz'
        }
      }
    )
    .expect(400)
    .end(function(err, res){
      assert(findError(res.body.errors, 'currencies'));
      assert(findError(res.body.errors, 'currencies').message == 'please provide currencies');
      if (err) throw err;
      done();
     });
  });


  it('should return error with no ripple_address', function(done){
    request(app)
      .post('/v1/config/wizard')
      .send( {
        config: {
          database_url: 'postgres://postgres:password@localhost:5432/ripple_gateway',
          ripple_rest_url: 'http://localhost:5990/v1'
        }
      }
    )
    .expect(400)
    .end(function(err, res){
      assert(findError(res.body.errors, 'currencies'));
      assert(findError(res.body.errors, 'currencies').message == 'please provide currencies');
      assert(findError(res.body.errors, 'ripple_address'));
      assert(findError(res.body.errors, 'ripple_address').message == 'please provide a valid ripple_address');
      if (err) throw err;
      done();
    });
  });

  it('should return error with no database_url', function(done){
    request(app)
      .post('/v1/config/wizard')
      .send( {
        config: {
          database_url: 'postgres://postgres:password@localhost:5432/ripple_gateway',
          ripple_address: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
          currencies: {
            SWD: 110
          }
        }
      }
    )
    .expect(400)
    .end(function(err, res){
      assert(findError(res.body.errors, 'ripple_rest_url'));
      assert(findError(res.body.errors, 'ripple_rest_url').message == 'please provide a valid ripple_rest_url');
      if (err) throw err;
      done();
    });
  });



  it('should return error with an invalid database_url', function(done){
    request(app)
      .post('/v1/config/wizard')
      .send( {
        config: {
          database_url: 'invalidPostgresUrl',
          ripple_rest_url: 'http://localhost:5990/v1',
          ripple_address: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
          currencies: {
            SWD: 0
          }
        }
      }
    )
    .expect(400)
    .end(function(err, res){
      assert(findError(res.body.errors, 'database_url'));
      assert(findError(res.body.errors, 'database_url').message == 'please provide a valid database_url');
      if (err) throw err;
      done();
    });
  });

  it('should return error with an invalid ripple_rest_url', function(done){
    request(app)
      .post('/v1/config/wizard')
      .send( {
        config: {
          database_url: 'postgres://postgres:password@localhost:5432/ripple_gateway',
          ripple_rest_url: 'inValidRippleRestUrl',
          ripple_address: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
          currencies: {
            SWD: 0
          }
        }
      }
    )
    .expect(400)
    .end(function(err, res){
      assert(findError(res.body.errors, 'ripple_rest_url'));
      assert(findError(res.body.errors, 'ripple_rest_url').message == 'please provide a valid ripple_rest_url');
      if (err) throw err;
      done();
    });
  });

  it('should return error with an invalid ripple_address', function(done){
    request(app)
      .post('/v1/config/wizard')
      .send( {
        config: {
          database_url: 'postgres://postgres:password@localhost:5432/ripple_gateway',
          ripple_rest_url: 'http://localhost:5990/v1',
          ripple_address: 'invalidRippleAdddress',
          currencies: {
            SWD: 0
          }
        }
      }
    )
    .expect(400)
    .end(function(err, res){
      assert(findError(res.body.errors, 'ripple_address'));
      assert(findError(res.body.errors, 'ripple_address').message == 'please provide a valid ripple_address');
      if (err) throw err;
      done();
    });
  });

  it('should return error with an invalid currency trust amount', function(done){
    request(app)
      .post('/v1/config/wizard')
      .send( {
        config: {
          database_url: 'postgres://postgres:password@localhost:5432/ripple_gateway',
          ripple_rest_url: 'http://localhost:5990/v1',
          ripple_address: 'rMinhWxZz4jeHoJGyddtmwg6dWhyqQKtJz',
          currencies: {
            SWD: 'notANumber'
          }
        }
      }
    )
    .expect(400)
    .end(function(err, res){
      assert(findError(res.body.errors, 'currency_limit'));
      assert(findError(res.body.errors, 'currency_limit').message == 'please provide a valid currency limit amount');
      if (err) throw err;
      done();
    });
  });

});

