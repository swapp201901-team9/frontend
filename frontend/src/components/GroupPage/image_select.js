$(document).ready(function(){  
    $(".select p").click(function(){    
     $(".select p").addClass("on");  
     $(".select .sub").slideToggle("fast");   
    });
   
    $(".select .sub").mouseleave(function() {
     $(".select p").removeClass("on"); 
    $(this).hide();
   });
  
  
  });