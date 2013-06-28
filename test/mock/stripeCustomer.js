(function (window) {

  if (!window.qv) {
    window.qv = {
      mock: {}
    }
  }
  
  window.qv.mock.stripeCustomer = {
    "object":"customer",
    "created":1372447957,
    "id":"cus_26KGpwU6GUtBG5",
    "livemode":false,
    "description":"Christopher Esplin: christopher.esplin@gmail.com",
    "active_card":{"object":"card",
      "last4":"4242",
      "type":"Visa",
      "exp_month":1,
      "exp_year":2014,
      "fingerprint":"UvdQJHXlyFSe6fmI",
      "country":"US",
      "name":null,
      "address_line1":null,
      "address_line2":null,
      "address_city":null,
      "address_state":null,
      "address_zip":null,
      "address_country":null,
      "cvc_check":"pass",
      "address_line1_check":null,
      "address_zip_check":null
    },
    "email":null,
    "delinquent":false,
    "subscription":{
      "plan":{
        "interval":"month",
        "name":"Quiver Preview",
        "amount":0,
        "currency":"usd",
        "id":"quiver0",
        "object":"plan",
        "livemode":false,
        "interval_count":1,
        "trial_period_days":14
      },
      "object":"subscription",
      "start":1372448168,
      "status":"trialing",
      "customer":"cus_26KGpwU6GUtBG5",
      "cancel_at_period_end":false,
      "current_period_start":1372447957,
      "current_period_end":1373657557,
      "ended_at":null,
      "trial_start":1372447957,
      "trial_end":1373657557,
      "canceled_at":null,
      "quantity":1
    },
    "discount":{
      "coupon":{
        "id":"neverpayforanything",
        "percent_off":100,
        "amount_off":null,
        "currency":null,
        "object":"coupon",
        "livemode":false,
        "duration":"forever",
        "redeem_by":1440287999,
        "max_redemptions":1000,
        "times_redeemed":249,
        "duration_in_months":null
      },
      "start":1372448168,
      "object":"discount",
      "customer":"cus_26KGpwU6GUtBG5",
      "end":null
    },
    "account_balance":0
  };

})(window);