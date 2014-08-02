var assert = require("assert");
var gateway = require(__dirname+"/../../");
var Policy = gateway.data.models.policies;

var createdPolicy;

describe("Policy database model", function() {
  
  it("should create a valid policy record", function(next) {
    Policy.create({
      ripple_address_id: 99,
      external_account_id: 27,
      name: "default",
      fee: 0.77
    }).complete(function(error, policy) {
      createdPolicy = policy;
      assert(policy.id > 0);
      assert.strictEqual(policy.ripple_address_id, 99);
      assert.strictEqual(policy.external_account_id, 27);
      assert.strictEqual(policy.fee, "0.77");
      assert.strictEqual(policy.name, "default");
      next();
    });
  });

  it("should require a ripple address id", function() {
    policy = Policy.build({
      external_account_id: 97
    });
    assert.strictEqual(policy.validate().ripple_address_id[0],
      'Validation notNull failed: ripple_address_id');
  });

  it("should require an external account id", function() {
    policy = Policy.build({
      ripple_address_id: 97
    });
    assert.strictEqual(policy.validate().external_account_id[0],
      'Validation notNull failed: external_account_id');
  })

  after(function(next) {
    createdPolicy.destroy().complete(next);
  });

});

