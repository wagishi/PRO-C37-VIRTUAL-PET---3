class Food{
    constructor(){
       var foodStock = 0;
       var lastFeed;
        this.image=loadImage('images/Milk.png');
    }
    getFoodStock(){
      return this.foodStock;
    } 

    updateFoodStock(foodStock){
        this.foodStock=foodStock;
    }

     deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
           }
     }

     getFeedTime(lastFeed){
      this.lastfeed = lastfeed;
     }

     garden(){
         background(garden,750,300);
     }

     bedroom(){
         background(bedroom,750, 300);
     }

     washroom(){
         background(washroom,750,300);
     }

    display(){
        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i = 0; i<this.foodStock; i++){
                if(i%10 === 0){
                    x = 80;
                    y = y+50;
                }
             image(this.image,x,y,50,50);
             x = x+30
            }
        }
    }
}