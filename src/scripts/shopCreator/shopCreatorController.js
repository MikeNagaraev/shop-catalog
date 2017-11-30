export default class ShopCreatorDirective {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = '../src/scripts/shopCreator/shopCreator.html';
        this.scope = {
          shops: "="
        };
        this.controller = ShopCreatorDirectiveController;
        this.controllerAs = 'shopCreator';
        this.bindToController = true;
    }
}

class ShopCreatorDirectiveController {
    constructor($scope) {
        this.scope = $scope;
        this.newItem = {
            name: "",
            address: ""
        };
    }

    saveShop() {
        this.newItem.id = this.shops[this.shops.length - 1].id + 1;
        this.copyShops = this.shops.slice(0);
        this.copyShops.push(this.newItem);

        this.shops = angular.copy(this.copyShops);
        this.scope.$emit("shopCreated");
    }
}
