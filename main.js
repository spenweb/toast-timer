$(document).ready(function() {
var low = 0;
var high = 0;
var mid = 0;
var MID = 0; //Interger form of mid in minutes
var time = 0;
var power = false;
var overtime = false;
var enoughTime = 2;
var audio = $('#overtime-song')[0];
var clapping = 5;
var alreadyPlayed = false;

$("#low").change(function(){
	low = Number($("#low").val());
	console.log("low"+low);
	getMiddle(high,low);
});
$("#high").change(function(){
	high = Number($("#high").val());
	console.log("high"+high);
	getMiddle(high,low);
});

/*Buttons****************************/

$(".startTimer").click(function(){
	console.log("start");
	power = true; 
	startTimer(); 
	closeModal();
	if(low == 0 || high == 0){
		low = Number($("#low").val());
		console.log("low"+low);
		high = Number($("#high").val());
		console.log("high"+high);
		getMiddle(high,low);
	}
	else{
		console.log("low"+low);
		console.log("high"+high);
	}
	$("#lowDisplay").html(low);
	$("#highDisplay").html(high);
	$("#startTimer-dash").attr("disabled","true");
});
$("#stopTimer").click(function(){
	console.log("stop");
	power = false;
	$("#startTimer-dash").removeAttr("disabled");
	audio.pause();
});
$("#resetTimer").click(function(){
	console.log("reset");
	power = false; 
	time=0;
	$(".sec, .min").html("00"); 
	openModal();
	$(".background").css("background-color","#f2f2f2");
	$(".progress").attr("value",0);
	overtime = false;
	alreadyPlayed = false;
	audio.pause();
});

$(".background").click(function(){
	$(".dash-board").slideToggle({"duration":200});
	if(!overtime){
		$(".big-time-container").fadeToggle(300);
	}
});


/*Functions********************************/

function getMiddle(h,l){
	if(h > 0 && l > 0){
		mid = (h + l)/2;
		MID = parseInt(mid * 60);
		console.log("mid",mid);
		console.log("MID", MID);
	}
};
function startTimer(){
	var x = setInterval(function(){
		if(power){
			time += 1;
			console.log("Time: ", time);
			if(time == low * 60){
				$(".background").css("background-color","#23D160");
			}
			if(time == MID){
				$(".background").css("background-color","yellow");
			}
			if(time==high * 60){
				$(".background").css("background-color","#FF3860");
			}
			if(time==high * 60 || time >= high * 60){
				overTime();
			}
			if(time >= high * 60 + enoughTime){
				if(!alreadyPlayed){
					audio.play();
					alreadyPlayed = true;
				}
				
			}
			var min = parseInt(time / 60);
			if(min < 10){
				min = "0" + min;
			}
			var sec = time % 60;
			if(sec <10){
				sec = "0" + sec;
			}
			$(".min").html(min);
			$(".sec").html(sec);
			$(".progress").attr("value", time/(high*60)*100);
		}
		else{
			clearInterval(x);
		}
	}, 1000);
}

function closeModal(){
	$(".modal").removeClass("is-active");
}

function openModal(){
	$(".modal").addClass("is-active");
}

function overTime(){
	$(".big-time-container").css("display", "inherit");
	overtime = true;
}

/*  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }*/






});
