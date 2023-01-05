window.cookieconsent.initialise({
	container: document.getElementById("cookieconsent"),
	palette: {
		popup: {
			background: "#fbfbfb",
			text: "#333",
			link: "#010066",
		},
		button: {
			background: "#84d171",
			border: "transparent",
			text: "#010066",
		},
		highlight: {
			background: "#333",
			border: "transparent",
			text: "#777",
		},
	},
	content: {
		header: "Cookies used on the website!",
		message: "Este site usa cookies para garantir que você obtenha a melhor experiência em nosso site.",
		allow: "Aceitar",
		deny: "Recursar",
		dismiss: "Concordo",
		link: "Saiba mais",
		href: "https://cba.com.br/cba/politica-de-privacidade",
		policy: "Política de Cookie",
	},
	revokable: true,
	onStatusChange: function(status) {
	  console.log(this.hasConsented() ?
	  'enable cookies' : 'disable cookies');
	},
	// "theme": "edgeless",
	position: "bottom"
});