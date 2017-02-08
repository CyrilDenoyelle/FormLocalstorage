$(document).ready(function(){
	// console.log('coucoucou')
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
		// console.log('assigne nb');
		localStorage.setItem("nb", 1);
	}
	if(!localStorage.getItem("users")){
		// console.log('assigne users');
		var users = [];
		localStorage.setItem('users', JSON.stringify(users));
	}
	else if(localStorage.getItem("users")){
		var users = JSON.parse(localStorage.getItem("users"));
	}

	$('#inscr').on('submit', function(event){
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
		var citi
		var tel = $('#tel').val();
		var password = $('#password').val();
		var confirmPasswordInput = $('#confirmPasswordInput').val();

		if(users.length === 0){// si non on inscript
			ok = true;
		}
		else{//si des utilsateurs se sont deja inscript on compare avec les donnée préventes
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
			if(incr === 0){
				ok = true;
			}
		}
		if(ok){
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
			alert("vous etes bien incriptionné");
			$(location).attr('href',"connection.html");//renvoyer vers la page de connection
		}

	});

	$('#connect').on('submit', function (event) {
		event.preventDefault();
		// console.log('coucou')
		var ok = false;

		var pseudo = $('#pseudoemail').val();
		var password = $('#password').val();

		for(var i=0; i<users.length; i++){
			if(users[i].pseudo === pseudo || users[i].email == pseudo){
				if(users[i].password == password){
					alert('OK');
					$(location).attr('href',"reussiteconnection.html");//renvoyer vers la page de "CONNECTÉ!"
				}else if(users[i].password !== password){
					console.log('ERREURE MDP OU LOGIN')
				}
			}
		}
		
	})

	var colors = ["#DF06FF", "#50FFFA", "#FFFC00", "#FFD300", "#2116FF"];
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
		$('.colors').each(function(){
			$('.colors').css("color", randcol(colors))
		});
	}, 125);

})