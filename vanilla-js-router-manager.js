/*!
 * vanillaJSRouterViewManager v1.0.0 - developed by anoxxxy aka Anoxy
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 * https://github.com/anoxxxy/vanillajsroutermanager
 */

class vanillaJSRouterViewManager {
  constructor() {
    this.currentView = null;
    this.hideAllViews();
  }

  // Enhanced method to handle different selector types
  _resolveSelectors(selectors) {
    return selectors.map(selector => {
      // If it's a data attribute selector
      if (selector.startsWith('data-')) {
        return `[${selector}]`;
      }
      // Return as-is for class, id, or other selectors
      return selector;
    });
  }

  // Remove specified elements from the DOM
  removeElements(elementsToRemove) {
    const resolvedSelectors = this._resolveSelectors(elementsToRemove);
    resolvedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });
  }

  // Hide specified elements from the DOM
  hideElements(elementsToHide) {
    const resolvedSelectors = this._resolveSelectors(elementsToHide);
    resolvedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
      });
    });
  }

  // Show specified elements from the DOM
  showElements(elementsToShow) {
    const resolvedSelectors = this._resolveSelectors(elementsToShow);
    resolvedSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.style.display = 'block';
        requestAnimationFrame(() => {
          el.classList.add('active');
        });
      });
    });
  }

  // Hides all views
  hideAllViews() {
    document.querySelectorAll('[data-route]').forEach((el) => {
      el.classList.remove('active');
      el.style.display = 'none';
    });
  }

  // Displays the matching view with a transition
  showView(element) {
    if (this.currentView) {
      this.currentView.classList.remove('active');
    }

    console.log('showView(element): ', element);
    const transition = element.getAttribute('data-route-transition') || 'fade';

    // Apply transition and show the view
    element.style.display = 'block';
    requestAnimationFrame(() => {
      element.classList.add('active', transition);
    });

    this.currentView = element;
  }

  // Handles route rendering
  handleRoute(viewElement, paramMap, options = {}) {
    const {
      show = [],
        hide = [],
        remove = [],
        removeKeys = []
    } = options;

    //stripping slashes from the start and end of viewElement
    //viewElement = viewElement.startsWith('/') ? viewElement.slice(1) : viewElement;
    //viewElement = viewElement.endsWith('/') ? viewElement.slice(0, -1) : viewElement;


    const $viewElement = document.querySelector(`[data-route="${viewElement}"]`);

    console.log('===================================================');
    console.log('routerViewManager handleRoute: ', $viewElement, );
    console.log('routerViewManager paramMap: ', paramMap);
    this.hideAllViews();
    if ($viewElement) {
      this.showView($viewElement);
      this.populateRouteData($viewElement, paramMap);
    }

    if (hide.length) {
      this.hideElements(hide);
    }

    if (show.length) {
      this.showElements(show);
    }

    if (remove.length) {
      this.removeElements(remove);
    }
  }



  // Populates dynamic data into the view
  populateRouteData(viewElement, paramMap, removeKeys = []) {
    Object.entries(paramMap).forEach(([key, value]) => {
      if (removeKeys.includes(key)) return;

      const dataElement = viewElement.querySelector(`[data-segment="${key}"]`);
      if (dataElement) {
        dataElement.textContent = value;
      }
    });
  }
}
/*
const viewManager = vanillaJSRouterViewManager();

// Example route rendering with extra actions
// Basic usage (same as before)
viewManager.handleRoute('home', { title: 'Welcome' });

// Advanced usage with show/hide/removeKeys
viewManager.handleRoute('profile', 
    { 
        username: 'JohnDoe', 
        email: 'john@example.com',
        sensitiveData: 'hidden' 
    }, 
    {
        show: ['.user-profile', '#userDetails'],
        hide: ['.login-form', '.guest-section'],
        removeKeys: ['sensitiveData']
    }
);

//-----------
// Works with data attribute selectors
viewManager.handleRoute('wallet', 
    { balance: '1000' }, 
    {
        show: ['data-route="/wallet/balance"'],
        hide: ['data-route="/wallet/history"'],
        remove: ['data-route="/wallet/temp-notice"']
    }
);

*/
