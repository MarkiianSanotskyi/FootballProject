

$(document).ready(function(){
   var lastId,
topMenu = $("ul.nav"),
    topMenuHeight =  1,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    },1400);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop) return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems.parent().removeClass("current")
            .end().filter("[href=#" + id + "]").parent().addClass("current");
    }
});
});

 var html = document.documentElement;
var rAF, target = 0, scroll = 0;

onmousewheel = function(e) {
  e.preventDefault();
  var scrollEnd = html.scrollHeight - html.clientHeight;
  target += (e.wheelDelta > 0) ? -120 : 120;
  if (target < 0) target = 0;
  if (target > scrollEnd) target = scrollEnd;
  if (!rAF) rAF = requestAnimationFrame(animate);
};

onscroll = function() {
  if (rAF) return;
  target = pageYOffset || html.scrollTop;
  scroll = target;
};

function animate() {
  scroll += (target - scroll) * 0.06;
  if (Math.abs(scroll.toFixed(5) - target) <= 0.47131) {
    cancelAnimationFrame(rAF);
    rAF = false;
  }
  scrollTo(0, scroll);
  if (rAF) rAF = requestAnimationFrame(animate);
}