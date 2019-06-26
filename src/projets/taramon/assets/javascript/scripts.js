$(document).ready(function(){

	/* gestion du slide */
	var i = 0 ;
	var surcharge = false ;
	$(".slide_left").hide();
	$(".bloc_slide .slide").eq(i).fadeIn(200);

	$(".bloc_slide .slide_right").click(function(){
		if (!surcharge )
		{
			surcharge = true ;
			$(".bloc_slide .slide").eq(i).fadeOut(300,function()
			{	
				$(".puces_slide li").eq(i).removeClass("active");
				i++;
				$(".puces_slide li").eq(i).addClass("active");
				$(".slide_left").show();
				if (i == 2) {$(".slide_right").hide();} 
				$(".bloc_slide .slide").eq(i).fadeIn(300,function(){surcharge=false});
			});
		}
	});

	$(".bloc_slide .slide_left").click(function(){
		if (!surcharge )
		{
			surcharge = true ;
			$(".bloc_slide .slide").eq(i).fadeOut(300,function()
			{
				$(".puces_slide li").eq(i).removeClass("active");
				i--;
				$(".puces_slide li").eq(i).addClass("active");
				$(".slide_right").show();
				if (i == 0) {$(".slide_left").hide();} 
				$(".bloc_slide .slide").eq(i).fadeIn(300,function(){surcharge=false});
			});
		}
	});

	/* gestion du formulaire  */
	$("input[type=text]").focus(function(){
		valeur = $(this).val();
		couleur = $(this).css("color");
		$(this).css("color","black");
		console.log(couleur);
		if (valeur == $(this).attr("value")) { $(this).val(""); }
		$(this).focusout(function(){
			if (! $(this).val() ) { $(this).val($(this).attr("value"));$(this).css("color",couleur); };
		});
	});

});