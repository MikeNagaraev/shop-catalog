Router.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function Router($stateProvider, $urlRouterProvider) {
    let shop = {
        name: 'shop',
        url: '/shop',
        templateUrl: '../src/scripts/shop/shop.html',
        controllerAs: 'shop',
        controller: 'ShopController'
    }

    $stateProvider
      .state(shop);

    $urlRouterProvider.otherwise('shop');
}
