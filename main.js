var _ = require('lodash');

// item to buy
var Item = function(name, initialPrice) {
  return {
    name: name
    , initialPrice: initialPrice
    , finalPrice: initialPrice
    , discounted: false
    , discountReason: ''
  };
};

// buy 2 pay for 2 rule
var buy3PayFor2Rule = function(items) {
  var chunkItemsBy3 = _.partial(_.chunk, _, 3);
  var is3ItemsChunk = function(chunk) { return _.size(chunk) === 3; };
  var discountChunk = function(chunk) {
    var item = _.first(chunk);
    var finalPrice = item.initialPrice * 2 / 3; // 3 by 2 discount
    var discountItem = function(item) {
      item.finalPrice = finalPrice;
      item.discounted = true;
      item.discountReason = 'Buy 3 pay for 2 rule';
      return item;
    };
    return _.chain(chunk).map(discountItem).value();
  };
  _.chain(items).groupBy('name').map(chunkItemsBy3).flatten()
    .filter(is3ItemsChunk).map(discountChunk).value();
  return items;
};

// buy 2 get spacial discount rule
var buy2PaySpecialRule = function(specialDiscount, items) {
  var chunkItemsBy2 = _.partial(_.chunk, _, 2);
  var is2ItemsChunk = function(chunk) { return _.size(chunk) === 2; };
  var discountChunk = function(chunk) {
    var discountItem = function(item) {
      item.finalPrice *= specialDiscount; // special discount
      item.discounted = true;
      item.discountReason = 'Buy 2 get special discount rule';
      return item;
    };
    return _.chain(chunk).map(discountItem).value();
  };
  _.chain(items).groupBy('name').map(chunkItemsBy2).flatten()
    .filter(is2ItemsChunk).map(discountChunk).value();
  return items;
};

// buy 2 in a set the cheapest item free rule
var buy3CheapestFreeRule = function(items) {
  var is3ItemsChunk = function(chunk) { return _.size(chunk) === 3; };
  var discountChunk = function(chunk) {
    var cheapestItem = _.min(chunk, 'initialPrice');
    cheapestItem.finalPrice = 0.0; // cheapest item free
    var discountItem = function(item) {
      item.discounted = true;
      item.discountReason = 'Buy 3 the cheapest item free rule';
      return item;
    };
    return _.chain(chunk).map(discountItem).value();
  };
  _.chain(_.chunk(items, 3)).filter(is3ItemsChunk).map(discountChunk).value();
  return items;
};

// add items to chart
var addItemsToChart = function() {
  var items = [ ];

  var item = Item('Apple', 10.0);
  items.push(item);
  item = Item('Apple', 10.0);
  items.push(item);
  item = Item('Apple', 10.0);
  items.push(item);
  item = Item('Apple', 10.0);
  items.push(item);
  item = Item('Apple', 10.0);
  items.push(item);

  item = Item('Pear', 20.0);
  items.push(item);

  item = Item('Orange', 30.0);
  items.push(item);
  item = Item('Orange', 30.0);
  items.push(item);
  item = Item('Orange', 30.0);
  items.push(item);

  item = Item('Lemon', 40.0);
  items.push(item);

  item = Item('Banana', 50.0);
  items.push(item);

  item = Item('Kiwi', 60.0);
  items.push(item);

  return items;
};

// configure rules application priority
var rules = [ buy3PayFor2Rule
  , _.partial(buy2PaySpecialRule, 0.75)
  , buy3CheapestFreeRule
];

// checkout items applying discount rules
var checkoutItems = function(rules, items) {
  var rejectDiscountedItems = _.partial(_.reject, _, 'discounted');
  var applyRuleToItems = function(rule) {
    return rule(rejectDiscountedItems(items));
  };
  _.chain(rules).map(applyRuleToItems).value();
  return items;
};
checkoutItems = _.partial(checkoutItems, rules);

// print receipt
var printReceipt = function(items) {
  var printItem = function(item) {
    console.log('[ %s ] was %s is %s (%s)'
      , item.name, item.initialPrice.toFixed(2), item.finalPrice.toFixed(2)
      , item.discountReason || 'No discount');
  };
  _.chain(items).map(printItem).value();
  var initialTotal = _.sum(items, 'initialPrice');
  var finalTotal = _.sum(items, 'finalPrice');
  console.log('\n                                  TOTAL: was %s is %s'
    , initialTotal.toFixed(2)
    , finalTotal.toFixed(2));
  return items;
};

// sell items
var sellItems = _.flow(addItemsToChart, checkoutItems, printReceipt);

sellItems();
