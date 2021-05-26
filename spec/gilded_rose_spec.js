
var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Décrémenter de 1 la qualité et sellIn des items standard", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Décrémenter de 2 la qualité après la date de péremption", function () {
    listItems.push(new Item("Cookie", 0, 10));
    listItems.push(new Item("Cookie", -2, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 8 },
      { sellIn: -3, quality: 4 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Fixer la qualité à 80 les items légendaires dont la péremption est nulle comme Sulfuras", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", undefined, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: undefined, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Décrémenter de 2 les items 'Conjured'", function () {
    listItems.push(new Item("Conjured Cookie", 9, 16));
    listItems.push(new Item("Conjured Limonade", 15, 22));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 8, quality: 14 },
      { sellIn: 14, quality: 20 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Stoper la décrémentation de la qualité à 0", function () {
    listItems.push(new Item("Cookie", 4, 0));
    listItems.push(new Item("Cookie", 12, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 3, quality: 0 },
      { sellIn: 11, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Stoper à 50 l'incrémentation de la qualité", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 50 },
      { sellIn: 4, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter de 2 la qualité à 10 jours de la péremption ou moins pour Aged Brie ou Backstage passes", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 27 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter de 3 la qualité quand à 5 jours de la péremption pour Aged Brie ou Backstage passes", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 35));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 4, quality: 38 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});