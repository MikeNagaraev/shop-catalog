import shops from './shops.json';

export default class ShopController {
    constructor($scope) {
        this.scope = $scope;
        this.shops = shops.shops;

        this.newShopWasCreated = false;

        this.scope.$on("shopCreated", this.onShopCreated.bind(this));
    }

    onShopCreated(data) {
        if (data) {
          this.newShopWasCreated = true;
        }
    }

    cancelAlert() {
        this.newShopWasCreated = false;
    }

    removeShop() {}
}
