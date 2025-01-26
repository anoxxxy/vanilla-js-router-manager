# Vanilla JS Router View Manager with VanillaJSRouter

This project showcases a custom `vanillaJSRouterViewManager` class for managing DOM-based views in a single-page application (SPA). It integrates seamlessly with the [VanillaJSRouter](https://github.com/anoxxxy/vanillajsrouter) for routing and provides functionality for dynamically showing, hiding, and removing views.

## Installation

Clone the repository and include [VanillaJSRouter](https://github.com/anoxxxy/vanillajsrouter) in your project. Add Bootstrap if you need modal support.

## Features

- **Dynamic View Management**: Dynamically hide, show, or remove views with `vanillaJSRouterViewManager`.
- **Route Parameter Handling**: Populate views with dynamic route data.
- **Modal Support**: Integrated with Bootstrap modals for additional functionality.
- **Catch-All Routes**: Graceful handling of undefined routes.
- **Seamless Navigation**: Use `data-route-navigate` attributes for declarative routing.

## Usage

### Router View Manager Class

The `vanillaJSRouterViewManager` manages views and dynamically handles DOM elements based on the current route.

### Routing with VanillaJSRouter

Define routes using VanillaJSRouter, and use the viewManager to handle view updates:

```javascript
// Initialize the view manager
const viewManager = new vanillaJSRouterViewManager();

// Define a modal route handler
const showModal = (matches, params, route) => {
    console.log('Modal params:', matches, params, route);
    viewManager.handleRoute(route, params);
    const modal = new bootstrap.Modal(document.getElementById('profileModal2'));
    modal.show();
};

// Example Route Definitions
Router
    .add('/hejsan', (matches, params, route) => {
        viewManager.handleRoute(route, params);
        console.log('Hejsan route triggered:', matches, params, route);
    })
    .add('/modal/:id', showModal)
    .add('/users/:username/profile/:profileType/:section', (matches, params, route) => {
        console.log('User Profile route triggered:', matches, params, route);
        viewManager.handleRoute(route, params, { show: ['data-route="/wallet/balance"'] });
    })
    .add('/products/:home/:furniture/:product/:id', (matches, params, route) => {
        console.log('Product Details route triggered:', matches, params, route);
        viewManager.handleRoute(route, params);
    })
    .add('/wallet/balance', (matches, params, route) => {
        console.log('Wallet Balance route triggered:', matches, params, route);
        viewManager.handleRoute(route, params);
    })
    .add('.*', (data) => {
        console.warn('Catch-all route triggered:', data);
    })
    .beforeAll(() => {
        console.log('Before all routes');
    })
    .apply()
    .start()
    .navigate('/hejsan');
```

### Declarative Navigation with data-route-navigate

Handle navigation dynamically with `data-route-navigate` attributes:

```javascript
document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-route-navigate]');
    if (!target) return;
    
    event.preventDefault();
    
    const url = target.getAttribute('data-route-navigate');
    if (url) {
        Router.navigate(url);
    } else {
        console.warn('No URL specified in data-route-navigate attribute.');
    }
});
```
