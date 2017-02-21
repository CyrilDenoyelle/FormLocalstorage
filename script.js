(function(){

	var app = {
		init:function(){
			this.password();
			this.localStorageinit();
			this.inscrinit();
			this.connectinit();
			this.connectstatus();
			this.colorinit();
		},
		password:function(){
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
		},
		localStorageinit:function(){
			if(!localStorage.getItem("nb")){
				localStorage.setItem("nb", 1);
			}if(!localStorage.getItem("users")){
				users = [];
				localStorage.setItem('users', JSON.stringify(users));
			}else if(localStorage.getItem("users")){
				users = JSON.parse(localStorage.getItem("users"));
			}
		},
		inscrinit:function(){
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
		},
		connectinit:function (argument) {
			$('#connect').on('submit', function (event) {
				event.preventDefault();
				// console.log('coucou')
				var ok = false;

				var pseudo = $('#pseudoemail').val();
				var password = $('#password').val();

				if(!pseudo || !password){
					alert('il manque quelques chose, non ?');
				}

				for(var i=0; i<users.length; i++){
					if(users[i].pseudo === pseudo || users[i].email == pseudo){
						if(users[i].password == password){
							alert('OK');
							localStorage.setItem("consta", "Y88T*)m.y%8E=%By+{.6@VsoR5{883R0+oi;c&UA81Z2Y,<9d_NFdwyjl]Qx)EmxM(0Xym,VM@aH9L.*wU-5-p%/8Eb5357aG67G[DQG./oX=@eE28!IkqZ0q4vzQ^Y#rSfo02vs=6*0<[5!fQ2>;5s3J61V5mUKv1PeX[a0kCIB)1o~N5DL6n{E0_U@3MmG258@MT/z@$8{nq&^Dd@7=E8A<1vwmsfYt7880#eF5>2ybK1L09~oq7b-O0!X4dIf");
							$(location).attr('href',"reussiteconnection.html");//renvoyer vers la page de "CONNECTÉ!"
						}else if(users[i].password !== password){
							console.log('ERREURE MDP OU LOGIN')
						}
					}
				}
			})
		},
		colorinit:function(){
			var colors = ["DF06FF", "50FFFA", "FFFC00", "FFD300", "2116FF"];
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
					$(this).css("color", '#'+randcol(colors));
				});
				$('#linkfavicon').attr("href", randcol(colors)+'.ico');

				$('.colors').each(function(){
					$(this).css("color", '#'+randcol(colors));
				});
				$('.bgcolors').each(function(){
					$(this).css("background-color", '#'+randcol(colors));
				});
			}, 100);
		},
		connectstatus:function(){
			if(!localStorage.consta || localStorage.getItem("consta") != "Y88T*)m.y%8E=%By+{.6@VsoR5{883R0+oi;c&UA81Z2Y,<9d_NFdwyjl]Qx)EmxM(0Xym,VM@aH9L.*wU-5-p%/8Eb5357aG67G[DQG./oX=@eE28!IkqZ0q4vzQ^Y#rSfo02vs=6*0<[5!fQ2>;5s3J61V5mUKv1PeX[a0kCIB)1o~N5DL6n{E0_U@3MmG258@MT/z@$8{nq&^Dd@7=E8A<1vwmsfYt7880#eF5>2ybK1L09~oq7b-O0!X4dIf"){
				$('#connectstatus').html("<a href='inscription.html' id='lienincrip'>Inscription</a><br><a href='connection.html' id='lienconnec'>Conection</a>");
				localStorage.setItem("consta", 0);
			}else if(localStorage.consta == "Y88T*)m.y%8E=%By+{.6@VsoR5{883R0+oi;c&UA81Z2Y,<9d_NFdwyjl]Qx)EmxM(0Xym,VM@aH9L.*wU-5-p%/8Eb5357aG67G[DQG./oX=@eE28!IkqZ0q4vzQ^Y#rSfo02vs=6*0<[5!fQ2>;5s3J61V5mUKv1PeX[a0kCIB)1o~N5DL6n{E0_U@3MmG258@MT/z@$8{nq&^Dd@7=E8A<1vwmsfYt7880#eF5>2ybK1L09~oq7b-O0!X4dIf"){
				$('#connectstatus').html($("<a/>").text('Déconnection').attr('href', "connection.html").attr('id', 'liendeconnec').on('click', function(e){
					e.preventDefault();
					localStorage.setItem("consta", 0);
					$(location).attr('href', "connection.html");
				}));
				function auHasard(input){
					return input[Math.floor(Math.random()*input.length)];
				}
				function toggleGen(inp){
					// console.log(select.indexOf(inp))
					if(select.includes(inp)){
						select.splice(select.indexOf(inp), 1);
					}else{
						select.push(inp);
					}
					if(dejapass.includes(inp)){
						dejapass.splice(dejapass.indexOf(inp), 1);
					}
				}
				var all = ['Quentin', 'Cyril', 'Lesly', 'Carole', 'Jef', 'Odile', 'Patrick', 'Jérome', 'Raphaël', 'Julien', 'David', 'Géna', 'Kévin', 'Thibault', 'Aymeric', 'Victor', 'Laurent', 'Allan'];
				$('#contentconnec').append($("<form/>").attr('id', "validgeninp").append($("<labell/>").text("randomqui ?")).append($("<textarea/>").css("width", "100%").css("height", "100px").attr('id', "geninp")).append($("<input/>").attr("type", "submit").val("Validay")));

				// if(!localStorage.getItem("saverand")){
				// 	localStorage.setItem("saverand", );
				// }

				$('#validgeninp').on('submit', function (e) {
					// $('#validgeninp').remove();
					e.preventDefault();
					var entree = $('#geninp').val();
					if(!entree){
						alert("entrez des gens ou des choses a randomiser");
					}else{
						select = entree.split(" ");
						console.log(select);
						dejapass = [];
						$('#contentconnec').html('<div id="receiverbtn" class="flexB">');
						for(i=0; i<select.length; i++){
							$('#receiverbtn').append($('<button/>').addClass('btngen paspasse').text(select[i]));
						};
						$('#receiverbtn').append($('<button/>').text('LANCER RANDOM').attr('title', 'click sur les gens a sortir du random').addClass('bgcolors').attr('id', 'rand').on('click', function(){
							if(dejapass.length < select.length){
								var genRand = auHasard(select);
								while(dejapass.includes(genRand)){
									genRand = auHasard(select);
								}
								$('.btngen').each(function(){
									if($(this).text()==genRand){
										$(this).addClass('bgcolors');
									}
								})
								$('#genRand').append($('<div/>').addClass('genchoisi colors').text(genRand));
								dejapass.push(genRand);
							}else{
								dejapass = [];
								$('.btngen').removeClass('bgcolors');
								$('.btngen').css('background-color', 'buttonface');
								$('#genRand').empty()
							}

						}));
						$('.btngen').on('click', function(){
							$(this).toggleClass('active');
							toggleGen($(this).text());
						})
					}
					
				})
				
				// $('#contentconnec').html()
			}
		}
	};

	$(document).ready(function(){
		// console.log('coucoucou');
		app.init()
	});

})();

function choisir(inp){
	if(select.includes(inp)){
		dejapass.push(inp)
		$('.btngen').each(function(){
			if($(this).text()==inp){
				$(this).addClass('bgcolors');
			}
		});
		$('#genRand').append($('<div/>').addClass('genchoisi colors').text(inp));
	}
}

function retirer(inp){
	if(select.includes(inp)){
		dejapass.splice(dejapass.indexOf(inp))
		$('.btngen').each(function(){
			if($(this).text()==inp){
				$(this).removeClass('bgcolors');
				$(this).css('background-color', '#fff')
			}
		});
		$('.btngenchoisi').each(function(){
			if($(this).text()==inp){
				$(this).remove();
			}
		})
	}
}