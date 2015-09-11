 ~(function() {
    // 定义应用application    
    var app = angular.module('ListApp', ['ngRoute']);

    // 应用路由配置
    app.config(['$routeProvider', '$locationProvider' ,function($routeProvider) {
    	// 首页
    	$routeProvider.when('/', { templateUrl: '/template/list.html', controller: 'ListController'})
    					.when('/type/:type/id/:id', { templateUrl: '/template/detail.html', controller: 'detailController'})
    					.otherwise(function(){
    						location.href = '/404';
    					})
    	
    }]).run(function($rootScope, $location) { // 初始化
    	// 加载进度条
    	var options = {
         id: 'top-progress-bar',
         color: '#f57403', 
         height: '2px', 
         duration: 0.2
        };

        $rootScope.progressBar = new ToProgress(options);
        

       	// 视图切换
       	$rootScope.$on('$routeChangeStart', function(){
       		$rootScope.progressBar.increase(20);
       	})

       	$rootScope.$on('$routeChangeSuccess', function(){
       		$rootScope.progressBar.finish();
       	})

    })

    // app全局控制器
    app.controller('MainController', function($rootScope, $scope, $http){
    	$scope.config = {
    		navCur: 2
    	};
    })

//--------------------
    
    // 资源service
    app.service('listService', function($http, $q){
    	var baseUrl = 'http://localhost:3000/api/list';
    	this.list = function(){
    		var deferred = $q.defer();
    		$http({
    			method: 'get',
    			url: baseUrl
    		}).success(function(data) {
    			deferred.resolve(data)
    		}).error(function() {
    			deferred.reject('error');
    		})

    		return deferred.promise;
    	}

    	this.find = function(id){
    		var deferred = $q.defer();
    		$http({
    			method: 'get',
    			url: baseUrl+'/id/'+ id
    		}).success(function(data) {
    			deferred.resolve(data)
    		}).error(function() {
    			deferred.reject('error');
    		})

    		return deferred.promise;
    	}
    })

    // 首页列表控制器
    app.controller('ListController', function($scope, $rootScope, listService){
    	//$rootScope.progressBar.finish();
    	
    	listService.list().then(function(data) {
    		$scope.data = data;
    		$scope.list = data.list;
    	}, function(){
    		$scope.list = [];
    	})
    })	

    app.controller('detailController', function($scope, $routeParams, listService){
    	listService.find($routeParams.id).then(function(data) {
    		$scope.data = data;
    	}, function(){
    		$scope.data = [];
    	})
    })
})();