$(document).ready(function() {
    $("#img[src='']").hide();
    $(".answer").hide();
    
    
    var right = 0;
    var wrong = 0;
    var intervalId;
    var clock = 0;
    var counter = 0;    
    var trivia = { 
    
    quest : [
        {q: "What is the capital of Peru?", a1: "Lima", a2: "Cusco", a3: "Colombia", a4: "Machu Picchu", ans: "Lima", img: ""}, 
    
        {q: "What is the largest ocean?", a1: "Indian Ocean", a2: "Atlantic Ocean", a3: "Pacific Ocean", a4: "Frank Ocean", ans: "Pacific Ocean", img: ""}, 
    
        {q: "Which country is represented by this flag?", a1: "Australia", a2: "New Zealand", a3: "Italy", a4: "United Kingdom", ans: "New Zealand", img: "assets/images/nz.png"},
        
        {q: "What is the world's longest river?", a1: "Nile", a2: "Euphrates", a3: "Mississippi", a4: "Amazon", ans: "Amazon", ans: "Amazon", img: ""},
    
        {q: "What is the world's tallest mountain?", a1: "K2", a2: "Mt. St. Helen's", a3: "Mt. Everest", a4: "Mt. Rushmore", ans: "Mt. Everest", img: ""}
    ],
        askQuestion : function(num) {
       
       $("#question").html(this.quest[num].q); 
       $("#answer1").html(this.quest[num].a1);
       $("#answer2").html(this.quest[num].a2);
       $("#answer3").html(this.quest[num].a3);
       $("#answer4").html(this.quest[num].a4);
       
       $("#answer1").val(this.quest[num].a1);
       $("#answer2").val(this.quest[num].a2);
       $("#answer3").val(this.quest[num].a3);
       $("#answer4").val(this.quest[num].a4);
       
       $("#img").attr("src", this.quest[num].img)
       $("#img:not([src=''])").show();
       $("#img[src='']").hide();
       n = num;
       
        },
          
        setClock : function() {
                            
          if (counter < trivia.quest.length) {
            trivia.askQuestion(counter);
            clock = 10;
                        
            intervalId = setInterval(function(){
                        
                
                clock--; 
                var audio = new Audio('assets/blop.mp3');
                audio.play();
                trivia.update();
                if (clock === 0) {
                    counter++;
                    wrong++;
                    clearInterval(intervalId);
                    var audio = new Audio('assets/quack.mp3');
                    audio.play();
                    trivia.setClock();
                                    
                }
            
                       
            }, 1000);
            } else {
                clearInterval(intervalId);
                alert ("DONE");
                trivia.results();
            }   
                
        },
    
    
        results : function() {
            $("#right").show();
            $("#wrong").show();
            $("#right").html("You got " + right + " right!");
            $("#wrong").html("You got " + wrong + " wrong :(");
            $("#start").show();
            $("#start").html("Try Again?");
        },
    
        update :function() {
            $("#clock").html(clock);
            $("#right").html(right);
            $("#wrong").html(wrong);
            $("#counter").html(counter);
        }
      
    };
         
    $(".answer").on("click", function() {
        if (counter < trivia.quest.length) {   
            var choice = $(this).val();
            if (choice == trivia.quest[n].ans) {
                right++;
                counter++;
                clearInterval(intervalId);
                trivia.setClock();
                var audio = new Audio('assets/coin.mp3');
                audio.play();
            } else {
                wrong++;
                counter++;
                clearInterval(intervalId);
                trivia.setClock();
                var audio = new Audio('assets/quack.mp3');
                audio.play();
            }
        }    
                
    });
       
    $("#start").on("click", function(){    
        $(".answer").show();
        $("#start").hide();
        $("#right").hide();
        $("#wrong").hide();
        counter = 0;
        right = 0;
        wrong = 0;                   
        trivia.setClock(); 
               
    });
    
        
    });
    
    