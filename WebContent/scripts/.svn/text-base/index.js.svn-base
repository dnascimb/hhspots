jQuery(document).ready(function(){

	// to fix height
	var body_height = $('#wrapper').height();
	body_height = body_height -153;
	$('#container').css('height', body_height);
	
// drop down slide logic
$('.map-tabs .expand-btn').click(function(){
						$('.drop-down-slid').slideDown('slow');
						$(this).hide();
					});

$('.collapse-btn').click(function(){
						$('.drop-down-slid').slideUp('slow');
						$('.map-tabs .expand-btn').show();
					});

// tabs logic 
$('.col3 div:not(:first)').hide();

$('.nav-col3 li').click(function(e){
	$('.col3 div').hide();
	$('.nav-col3 .current').removeClass("current");
	$(this).addClass('current');
	var clicked = $(this).find('a:first').attr('href');
	$('.col3 ' + clicked).fadeIn('fast');
	e.preventDefault();
}).eq(0).addClass('current');

});
