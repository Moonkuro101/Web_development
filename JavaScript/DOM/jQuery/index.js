// document.querySelector("h1").style.color =  "purple";

// $(document).keydown(function(event){
//   $("h1").html("<em>" + event.key + "</em>");
//   console.log(event.key);
// });

$("h1").on("mouseover", function(){
  $("h1").css("color", "purple");
});