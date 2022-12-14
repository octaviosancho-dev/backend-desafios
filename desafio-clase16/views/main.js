const socket = io();

// Products
const formAddProduct = document.querySelector('#form-add-product');
const listProducts = document.querySelector('#list-products');
const nameInput = document.querySelector('#name-product');
const priceInput = document.querySelector('#price-product');
const imgInput = document.querySelector('#img-product');
const tableProducts = document.querySelector('#table-products');
const emptyProductList = document.querySelector('#empty-productlist');

formAddProduct.addEventListener('submit', e => {
	e.preventDefault();
	const newProduct = {
		name: nameInput.value,
		price: priceInput.value,
		thumbnail: imgInput.value
	};
	socket.emit('newProduct', newProduct);
	e.target.reset();
	location.href = '/';
});

const renderProducts = products => {
	if (products.length > 0) {
		emptyProductList.style.display = 'none';
		tableProducts.innerHTML = '';
		products.forEach(product => {
			tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.name}</td>
			<td class="align-middle">${product.price}</td>
			<td class="align-middle">
				<img src="${product.thumbnail}" alt="${product.name}" width="100px">
			</td>
		</tr>`;
		});
	} else {
		emptyProductList.style.display = 'block';
	}
};

// Messages
const chatForm = document.querySelector('#chat-form');
const userEmail = document.querySelector('#user-email');
const chatMessage = document.querySelector('#chat-message');
const tableChat = document.querySelector('#table-chat');

chatForm.addEventListener('submit', e => {
	e.preventDefault();
	if (userEmail.value === '') return alert('Ingresa tu email');
	const newMessage = {
		email: userEmail.value,
		message: chatMessage.value,
		date: new Date().toLocaleString()
	};
	socket.emit('newMessage', newMessage);
	e.target.reset();
});

const renderChat = messages => {
	if (messages.length > 0) tableChat.innerHTML = '';
	messages.forEach( message => {
		tableChat.innerHTML += `
		<div>
			<b class="text-primary">${message.email}</b>
			[<span style="color: brown;">${message.date}</span>]
			: <i class="text-success">${message.message}</i>
		</div > `;
	});
	chatMessage.focus();
};

socket.on('products', products => {
	renderProducts(products);
});

socket.on('messages', messages => {
	renderChat(messages);
});
