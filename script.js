$(document).ready(function(){

	$('#password, #confirmPasswordInput').on('keyup', function(e) {
		if ($('#password').val() != '' && $('#confirmPasswordInput').val() != '' && $('#password').val() != $('#confirmPasswordInput').val()) {
			$('#passwordStrength').html('Vos passwords ne correspondent pas');
			return false;
		}
		var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		var okRegex = new RegExp("(?=.{8,}).*", "g");
		if (okRegex.test($(this).val()) === false) {
			$('#passwordStrength').removeClass().addClass('alert alert-error').html('Votre mot de passe doit comporter 8 caractères');
		} else if (strongRegex.test($(this).val())) {
			$('#passwordStrength').removeClass().addClass('alert alert-success').html('Mot de passe correct !');
		} else if (mediumRegex.test($(this).val())) {
			$('#passwordStrength').removeClass().addClass('alert alert-info').html('Make your password stronger with more capital letters, more numbers and special characters!');
		} else {
			$('#passwordStrength').removeClass().addClass('alert alert-error').html('Weak Password, try using numbers and capital letters.');
		}
		return true;
	});

	if(!localStorage.getItem("nb")){
		console.log('assigne nb');
		localStorage.setItem("nb", 1);
	}
	if(!localStorage.getItem("users")){
		console.log('assigne users');
		var users = [];
		localStorage.setItem('users', JSON.stringify(users));
	}
	else if(localStorage.getItem("users")){
		console.log('assigne pas users');
		var users = JSON.parse(localStorage.getItem("users"));
		console.log(users);
	}

	$('form').on('submit', function(event){
		event.preventDefault();
		var ok = false;

		if($('#sx1').is(':checked')){
			var sexe = 'Mm'
		}
		else if($('#sx2').is(':checked')){
			var sexe = 'Mr'
		}
		var nom = $('#nom').val();
		var prenom = $('#prenom').val();
		var pseudo = $('#pseudo').val();
		var email = $('#email').val();
		var tel = $('#tel').val();
		var password = $('#password').val();
		var confirmPasswordInput = $('#confirmPasswordInput').val();

		if(users.length !== 0){ //si des utilsateurs se sont deja inscript on compare avec les donnée préventes
			var incr = 0;
			for(var i=0; i<users.length; i++){
				if(users[i].email == email){
					incr++;
					alert('email deja utilisé');
				}
				if(users[i].pseudo == pseudo){
					incr++
					alert('pseudo deja pris');
				}
			}
			if(incr === 0){// si l'email et le pseudo sont unique on inscript
				ok = true;
			}
		}else{// si non on inscript
			ok = true;
		}
		if(ok){
			alert('vous etes bien incriptionné')
			var i=localStorage.getItem("nb");
			i++;
			localStorage.setItem("nb", i);
			var obj = {
				id: i,
				civilite: sexe,
				nom: nom,
				prenom: prenom,
				pseudo: pseudo,
				email: email,
				password: password,
				tel: tel
			}
			users.push(obj);
			localStorage.setItem('users', JSON.stringify(users));
		}

	});

	var colors = ["orange", "pink", "yellow", "yellow", "orange"];
	function randcol (arg) {
		if(!prevrand){
			var prevrand = arg.length+1
		}
		var  rand = arg[Math.floor((Math.random()*arg.length))];
		while (rand === prevrand) {
			var rand = arg[Math.floor((Math.random()*arg.length))];
		}
		prevrand = rand;
		return rand;
	};

	var inter = setInterval(function(){
		$('a').each(function(){
			$(this).css("color", randcol(colors));
		});
		$('input:submit').each(function(){
			$('.colors').css("color", randcol(colors))
		});
	}, 125);

})