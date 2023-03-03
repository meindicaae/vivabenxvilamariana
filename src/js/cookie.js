// cookie aceite termos de uso
window.cookieconsent.initialise({
	container: document.getElementById("cookieconsent"),
	palette: {
		popup: {
			background: "#FBFCFC",
			text: "#333",
			link: "#010066",
		},
		button: {
			background: "#1e024c",
			border: "transparent",
			text: "#FFF",
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
		href: "https://www.mpf.mp.br/servicos/lgpd/politicas/politicas-de-cookies",
		policy: "Política de Cookie",
	},
	revokable: true,
	onStatusChange: function(status) {
	  console.log(this.hasConsented() ?
	  'enable cookies' : 'disable cookies');
	},
	// "theme": "edgeless",
	position: "bottom-left"
});
