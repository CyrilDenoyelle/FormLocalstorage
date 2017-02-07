$(document).ready(function(){
	if(!localStorage.getItem("nb")){
		localStorage.setItem("nb", 1);
	}
	function Submitage(){
		var i=0;
		$('form').children().each(function(){
			i++;
			var nb = localStorage.getItem("nb");
			console.log(id);
			var id = $(this).attr('id');
			var val = $(this).val();
			localStorage.setItem([id+nb], [val]);
		});
		console.log(localStorage.getItem('nb'));
		localStorage.setItem('nb', -(-localStorage.getItem("id"))+1);
	}
	$('#subm').on('submit', function(event){
		event.preventDefault();
		Submitage();
	});
	$('#coucou').click(function (e) {
		// Submitage()
		// if(localStorage.getItem('id')){
		// }
		console.log(e)
		console.log(localStorage.getItem('event'));
		console.log(localStorage.getItem('nb'));
		console.log(localStorage);
	})
})