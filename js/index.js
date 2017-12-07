var app = angular.module("wikiApp", ['ngSanitize']);

app.controller("wikiController", ["$scope", "searchResults", function($scope, searchResults) {
  $scope.randomExtract = "This selects a randomly chosen Article";
  $scope.randomTitle = "Random Article";
  $scope.extract;
  $scope.title;
  $scope.results = [];
  $scope.in = $("input");
  $scope.randomUrl = "https://en.wikipedia.org/wiki/Special:Random";
  $scope.link = $scope.randomUrl;

  $scope.in.focus();
  $scope.title = $scope.randomTitle;
  $scope.extract = $scope.randomExtract + "<br><br>See more ==>";
  
  $scope.enter = function ($event) {
    if($event.which === 13) {
      searchResults.get($scope.content).then(
        function(data){
          if (data.data.query !== undefined) {
            $scope.results = [];
            var ind = 0;
            var page;
            for(var key in data.data.query.pages){
              var page = data.data.query.pages[key];
              page.link = "https://en.wikipedia.org/wiki/" + page.title;
              $scope.results.push(page);
            }
            if ($scope.results.length) {
              $scope.results.sort(function (a, b) {
                return (a.title > b.title ? 1 : -1);
              });
              page = $scope.results[0];
              $scope.title = page.title;
              $scope.extract = page.extract + "<br><br>See more ==>";
              $scope.link = page.link;
            }
          }
          else {
            $scope.results = [];
            $scope.content = "";
            $scope.title = $scope.randomTitle;
            $scope.extract = $scope.randomExtract + "<br><br>See more ==>";
            $scope.link = $scope.randomUrl;
          }
        }
      );
    }
  };
  
  $scope.selected = function ($event) {
    console.log(this.i);
    $scope.title = this.i.title;
    $scope.extract = this.i.extract + "<br><br>See more ==>";
    $scope.link = this.i.link;
  }
  
  $scope.connect = function() {
    var a = $("a");
    a.attr("href", $scope.link);
    a.attr("target", "_blank");
    a[0].click();
    $scope.in.focus();
  }
}]);

app.factory("searchResults", function($http, $sce) {
  var config = {
    params: {
      format: "json",
      action: "query",
      prop: "extracts",
      exchars: "140",
      exlimit: "10",
      exintro: "",
      explaintext: "",
      rawcontinue: "",
      generator: "search",
      gsrlimit: "10",
    }
  };
  var url = $sce.trustAsResourceUrl("https://en.wikipedia.org/w/api.php?");

  var results = {
    get: function(data) {
      config.params.gsrsearch = data;
      return $http.jsonp(url,config).then(
        function(rsp){
          return rsp;
        },
        function(rsp) {
          console.log("SearchResults.error", rsp.message);
        }
      );
    }
  };

  return results;
});
