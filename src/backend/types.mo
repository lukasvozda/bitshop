import Time "mo:base/Time";

module {

  public type ProductId = Nat;
  public type SlugId = Text;

  public type CreateProductError = {
    #UserNotAuthenticated;
    #EmptyTitle;
  };

  public type GetProductError = {
    #ProductNotFound;
  };

  public type UpdateProductError = {
    #UserNotAuthenticated;
    #EmptyTitle;
    #ProductNotFound;
  };

  public type DeleteProductError = {
    #UserNotAuthenticated;
  };

  public type CreateCategoryError = {
    #UserNotAuthenticated;
    #EmptyName;
    #CategoryAlreadyExists;
    // TODO add verification to category_create function
  };

  public type GetCategoryError = {
    #CategoryNotFound;
  };

  public type UpdateCategoryError = {
    #UserNotAuthenticated;
    #EmptyName;
    #CategoryNotFound;
  };

  public type DeleteCategoryError = {
    #UserNotAuthenticated;
  };

  public type Category = {
    name : Text;
    slug : Text;
  };

  // User input data
  public type UserProduct = {
    title : Text;
    price : Float;
    inventory : Nat8;
    description : Text;
    category : SlugId;
    status : { #active; #paused };
  };

  // Backend data
  public type Product = UserProduct and {
    id : ProductId;
    slug : Text;
    img : Blob;
    time_created : Time.Time;
    time_updated : Time.Time;
  };
};
