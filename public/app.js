// variables globales

var filtro = "";
var Ciudades = new Array();
var tipos = new Array();



//Inicializador del elemento select
$(document).ready(function () {
	$('select').material_select();
});


//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
	type: "double",
	grid: false,
	min: 0,
	max: 100000,
	from: 1000,
	to: 20000,
	prefix: "$"
})

function setSearch() {
	let busqueda = $('#checkPersonalizada')
	busqueda.on('change', (e) => {
		if (this.customSearch == false) {
			this.customSearch = true;
			filtro = false;
		} else {
			this.customSearch = false;
			filtro = true;
		}
		$('#personalizada').toggleClass('invisible');


		//------------agraga los filtros de busquedas--------------
		if (filtro == true) {

			$.ajax({
				url: `http://localhost:3000/all?`,
				type: "GET",
				data: {},
				success: function (data) {

					data.forEach(element => {

						if (Ciudades.includes(element.Ciudad)) {

						} else {
							Ciudades.push(element.Ciudad);
						};

						if (tipos.includes(element.Tipo)) {

						} else {
							tipos.push(element.Tipo);
						};

					});

					//-----------agraga a dom las ciudades y los tipos habilitados------

					if (filtro == true) {

						if ($("#ciudad").children().length < Ciudades.length) {

							Ciudades.forEach(element => {

								$(document).ready(function () {
									$('select').material_select();
								});

								$("#ciudad").append(`<option value="${element}">${element}</option>`);

							});
						};

						if ($("#tipo").children().length < tipos.length) {

							tipos.forEach(element => {

								$(document).ready(function () {
									$('select').material_select();
								});

								$("#tipo").append(`<option value="${element}">${element}</option>`);

							})}};
				}})};
	})};
setSearch();


//------------
$("#buscar").on("click",
	function () {
		let max = $("#rangoPrecio").data("ionRangeSlider").old_to;
		let min = $("#rangoPrecio").data("ionRangeSlider").old_from;

		(function eliminarData() {
			$(".lista").children().remove();
		})()


		if (filtro == true) {
			$.ajax({
				url: (() => {
					let selectedciudad = $("#ciudad :selected").text();
					let selectedtipo = $("#tipo :selected").text();

					if (selectedciudad != "Escoge una ciudad") {
						if (selectedtipo != "Escoge un tipo") {

							return `http://localhost:3000/filtered?precioMinimo=${min}&precioMaximo=${max}&ciudad=${selectedciudad}&tipo=${selectedtipo}`;

						} else {
							return `http://localhost:3000/filtered?precioMinimo=${min}&precioMaximo=${max}&ciudad=${selectedciudad}`;
						}

					} else if (selectedtipo != "Escoge un tipo") {
						return `http://localhost:3000/filtered?precioMinimo=${min}&precioMaximo=${max}&tipo=${selectedtipo}`;

					} else {
						return `http://localhost:3000/filtered?precioMinimo=${min}&precioMaximo=${max}`;
					}

				})(),
				type: "GET",
				data: {},
				success: function (data) {
					console.log("Data: ", data);
					console.log("Primera opcion");
					data.forEach(element => {
						$(".lista").append(`<div class="card horizontal">
							<div class="card-image">
							<img src="img/home.jpg">
							</div>
							<div class="card-stacked">
							<div class="card-content">
								<div>
								<b>Direccion: </b><p>${element.Direccion}</p>
								</div>
								<div>
								<b>Ciudad: </b><p>${element.Ciudad}</p>
								</div>
								<div>
								<b>Telefono: </b><p>${element.Telefono}</p>
								</div>
								<div>
								<b>Código postal: </b><p>${element.Codigo_Postal}</p>
								</div>
								<div>
								<b>Precio: </b><p>${element.Precio}</p>
								</div>
								<div>
								<b>Tipo: </b><p>${element.Tipo}</p>
								</div>
							</div>
							<div class="card-action right-align">
								<a href="#">Ver más</a>
							</div>
							</div>
						</div>`);
					});


				}
			})
		} else {
			$.ajax({
				url: `http://localhost:3000/all?`,
				type: "GET",
				data: {},
				success: function (data) {
					console.log("Data: ", data);

					data.forEach(element => {
						$(".lista").append(`<div class="card horizontal">
							<div class="card-image">
							<img src="img/home.jpg">
							</div>
							<div class="card-stacked">
							<div class="card-content">
								<div>
								<b>Direccion: </b><p>${element.Direccion}</p>
								</div>
								<div>
								<b>Ciudad: </b><p>${element.Ciudad}</p>
								</div>
								<div>
								<b>Telefono: </b><p>${element.Telefono}</p>
								</div>
								<div>
								<b>Código postal: </b><p>${element.Codigo_Postal}</p>
								</div>
								<div>
								<b>Precio: </b><p>${element.Precio}</p>
								</div>
								<div>
								<b>Tipo: </b><p>${element.Tipo}</p>
								</div>
							</div>
							<div class="card-action right-align">
								<a href="#">Ver más</a>
							</div>
							</div>
						</div>`);
					});


				}
			})
		};
	}
)