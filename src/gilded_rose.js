class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    let qualityEffect = 0;
    let dayUnity = 1;

    let maxQuality = 50;
    let minQuality = 0;

    this.items.forEach((item)=>{

    const checkItem = (item) => {
      switch(true) {
          case item.name.includes('Sulfuras'):
            break;
          case item.name.includes('Backstage passes'):
            backstageEffect(1);
            break;
          case item.name.includes('Aged Brie'):
              assignment(1);
              break;
          default:
              assignment(-1);
      }
    };

    const assignment = (qualityEffect) => {
      if(item.sellIn <= 0){
        qualityEffect = qualityEffect * 2;
      };
      if(item.name.includes('Conjured') === true){
        qualityEffect = qualityEffect * 2;
      }
      update(qualityEffect);
    };

    const backstageEffect = (actualQualityEffect) => {
      qualityEffect = actualQualityEffect;
      if(item.sellIn <= 10){
        qualityEffect = actualQualityEffect * 2;
      };
      if(item.sellIn <= 5){
        qualityEffect = actualQualityEffect * 3;
      };
      assignment(qualityEffect);
    };

    const checkLimit = () => {
      if(item.quality < minQuality){
        item.quality = minQuality;
      }else if(item.quality > maxQuality){
        item.quality = maxQuality;
      };
    };

    const update = (qualityEffect) => {
      item.sellIn = item.sellIn - dayUnity;
      item.quality = item.quality + qualityEffect;
      checkLimit()
    };

    checkItem(item);
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}