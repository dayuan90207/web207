 <script> 
    $(function(){ 
      // pic selector 
       $('.intro .pic-selector ul li').hover(function () { 
        $('.intro .pic-selector ul li').removeClass('active'); 
        $(this).addClass('active'); 
        $('.intro .pic-selector .pic img').attr('src', $(this).children('img').attr('src')); 
//       makeImageCoverSize(); 
       }); 
    }) 
   </script> 