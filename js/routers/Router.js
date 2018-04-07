app.routers.Router = Backbone.Router.extend({
  routes: {
    'category/:id/book/:bookID': 'book',
    'category/:id': 'category',
    '': 'home',
    '*default': 'unknown'
  },

  home: function() {
    console.log("Home");
  },

category: function(id) {
  console.log("category" + id);

  app.data.books = new app.models.Books(null, {catID: id});
  console.log(app.data.books.url());

  this._cleanupCurrentView();
  app.data.currentView = new app.views.BooksList({
    collection: app.data.books
  });

  this._activateBooksListPanel();
  $('[data-id=books-list]').empty().append(app.data.currentView.$el);

  app.data.books.fetch({reset:true});
},

book: function(id, bookID) {
  console.log("book" + bookID + " for category" + id);
},

unknown: function() {
  console.log("Unknown route. . . . ");
},


_activateBooksListPanel: function(selector) {
  $('[data-id = "books-wrapper"] .is-visible').removeClass('is-visible')
  $('[data-id=books-list]').addClass('is-visible');
},

_activateBookDetailPanel: function(selector) {
  $('[data-id = "books-wrapper"] .is-visible').removeClass('is-visible')
  $('[data-id=book]').addClass('is-visible');
},

_cleanupCurrentView: function() {
  if (app.data.currentView) {
    app.data.currentView.remove();
    app.data.currentView = null;
  }
}

});
