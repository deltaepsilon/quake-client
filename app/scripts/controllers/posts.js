'use strict';

angular.module('quiverApp')
  .controller('PostsCtrl', function ($scope, $route, $filter) {
    $scope.posts = $route.current.locals.posts;

    $scope.postsTableizer = function () {
      var posts = $scope.posts,
        postsTable,
        i,
        post,
        tags,
        j;

      if (!posts || !posts.length) {
        return $scope.postsTable = undefined;
      }

      postsTable = {
        theadClass: "light-text background-color-4",
        tbodyClass: "",
        columns: [
          {name: "Title"},
          {name: "Date"},
          {name: "Link"},
          {name: "Status"},
          {name: "Category"}
        ],
        rows: []
      };
      i = posts.length;

      while (i--) {
        post = posts[i];

        j = post.meta.length;
        tags = [];
        while (j--) {
          tags.push(post.meta[j].meta_value);
        }

        postsTable.rows.push({
          data: [
            {'class': "wrap-cell", contents: post.title},
            {'class': "ellipse-cell", contents: $filter('date')(post.date)},
            {'class': "wrap-cell", html: '<a target="_blank" href="' + post.link + '">view</a>'},
            {'class': "wrap-cell", contents: post.status},
            {'class': "wrap-cell", contents: post.category.nicename}
          ]
        });
      }

      return $scope.postsTable = postsTable;
    };

  });
