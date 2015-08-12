# Supermarket checkout application

## Problem

Implement a Supermarket checkout that calculates the total price of a number of
items.

Some items have multiple prices based on price rules such as:
- Buy 3 (equals) items and pay for 2
- Buy 2 (equals) items for a special discount
- Buy 3 (in a set of items) and the cheapest is free

The output required is the receipt with the actual price of every item and the
grand total.

You may choose any means of accepting input and producing output, including the
use of a test harness.

The code should be simple and flexible so that any new rule should be added with
the minimum effort.

## Solution

There is an `Item` object with a `name`, an `initialPrice` and a `finalPrice`
after applying discount which is described by a `discountReason` field.
`Item` also has a `discounted` field which prevents applying several discounts
to the same `Item`.

The main idea of the solution is to apply a `rules` function collection to the
`items` array setting a `discounted` field to `true` of the processed `Item`.

Applying functions over a list of data is very powerful and flexible functional
abstraction which permits adding new rules trivial.

## Input

```javascript
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
```

## Output

```
[ Apple ] was 10.00 is 6.67 (Buy 3 pay for 2 rule)
[ Apple ] was 10.00 is 6.67 (Buy 3 pay for 2 rule)
[ Apple ] was 10.00 is 6.67 (Buy 3 pay for 2 rule)
[ Apple ] was 10.00 is 7.50 (Buy 2 get special discount rule)
[ Apple ] was 10.00 is 7.50 (Buy 2 get special discount rule)
[ Pear ] was 20.00 is 0.00 (Buy 3 the cheapest item free rule)
[ Orange ] was 30.00 is 20.00 (Buy 3 pay for 2 rule)
[ Orange ] was 30.00 is 20.00 (Buy 3 pay for 2 rule)
[ Orange ] was 30.00 is 20.00 (Buy 3 pay for 2 rule)
[ Lemon ] was 40.00 is 40.00 (Buy 3 the cheapest item free rule)
[ Banana ] was 50.00 is 50.00 (Buy 3 the cheapest item free rule)
[ Kiwi ] was 60.00 is 60.00 (No discount)

                                  TOTAL: was 310.00 is 245.00
```

## Install

```bash
$ git clone https://github.com/volodymyrprokopyuk/supermarket.git
$ cd supermarket
$ npm install
$ node main.js
```
