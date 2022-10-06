$(".open").on("click", function(){
  $(".modal, .modal-content").addClass("active");
});

$(".close").on("click", function(){
  $(".modal, .modal-content").removeClass("active");
});