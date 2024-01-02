fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const productList = document.getElementById('product-list');
        data.products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name}: $${product.price}`;
            productList.appendChild(listItem);
        });
    });