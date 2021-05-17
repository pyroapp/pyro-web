const rect = $('#parallaxContainer')[0].getBoundingClientRect();
const mouseCoordinates = {x: 0, y: 0, moved: false};

$("#parallaxContainer").mousemove(function(e) {
  mouseCoordinates.moved = true;
  mouseCoordinates.x = e.clientX - rect.left;
  mouseCoordinates.y = e.clientY - rect.top;
});

TweenLite.ticker.addEventListener('tick', function(){
  if (mouseCoordinates.moved){
    iLikeToMoveItMoveIt(".parallaxbitch", -40);
    iLikeToMoveItMoveIt(".megaparallaxbitch", -110);
    iLikeToMoveItMoveIt(".parallaxback", -30);
  }
  mouseCoordinates.moved = false;
});

function iLikeToMoveItMoveIt(target, movement) {
  TweenMax.to(target, 0.3, {
    x: (mouseCoordinates.x - rect.width / 2) / rect.width * movement,
    y: (mouseCoordinates.y - rect.height / 2) / rect.height * movement
  });
}

$(window).on('resize scroll', function(){
  rect = $('#parallaxContainer')[0].getBoundingClientRect();
})