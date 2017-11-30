import angular from 'angular';
import router from 'angular-ui-router';

import IndexController from './IndexController';
import ProductController from '../product/ProductController';
import ShopController from '../shop/ShopController';

import ShopCreator from '../shopCreator/shopCreatorController';

import routesConfig from '../config/routes';

angular.module("shop-app", [router])
  .config(routesConfig)
  .controller('IndexController', IndexController)
  .controller('ShopController', ShopController)
  .controller('ProductController', ProductController)
  .directive('shopCreator', () => new ShopCreator())
