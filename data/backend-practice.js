const xhr = new XMLHttpRequest();

xhr.open("GET", "https://supersimplebackend.dev/products/first");
xhr.send();
xhr.addEventListener("load", () => {
	console.log(xhr.response);
});
