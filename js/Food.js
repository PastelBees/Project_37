class Food{
    constructor(){
        this.image = loadImage("images/Milk.png")
        
        this.gameState = "Hungry"
        this.foodStock = 20
       this.lastFed = hour()

       this.button= createButton("Feed the Dog");
       this.button2= createButton("Add Food");
       
    }


    getFoodStock(){
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value",(data)=>{
          foodStock = data.val();
        })
    }

    updateFoodStock(foodStock){
        database.ref('/').update({
            Food: foodStock
          });

    }

    bedroom(){
        background(bedroom)
    }

    garden(){
        if(gameState === "Playing")
        {background(garden, 10000, 500)}
    }

    washroom(){
        background(washroom)
    }


  
display(){

    if(gameState!="Hungry"){
        this.button.hide()
        this.button2.hide()
    }else{
        this.button.show()
        this.button2.show()
    }

    this.button.position(480,95);
    this.button.mousePressed(()=>{
    this.foodStock = this.foodStock-1
    
    feedDog()
})



    var x = 10, y = 70;

    
    image(this.image,150,380,70,70);

 

    if(this.foodStock!=0){
        for(var i=0; i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50;
            }
           image(this.image,x,y,50,50);
            x=x+30
        }
    }
    
this.button2.position(580,95);
this.button2.mousePressed(()=>{
    this.foodStock = this.foodStock+1
    addFoods()

})

}
}