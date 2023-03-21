import Text "mo:base/Text";
import Char "mo:base/Char";
import Blob "mo:base/Blob";
import Types "types";

module {

  type Response = Types.Response;

  func process_character(char : Char) : Char {
    let unicode_value = Char.toNat32(char);

    if (unicode_value >= 97 and unicode_value <= 122) {
      // leave as is
      return (Char.fromNat32(unicode_value));
    };
    if (unicode_value >= 65 and unicode_value <= 90) {
      // lowercase
      return (Char.fromNat32(unicode_value + 32));
    };
    if (unicode_value == 32) {
      // spaces to "-"
      return Char.fromNat32(45);
    };
    // remove everything else
    return Char.fromNat32(0);
  };

  public func slugify(word : Text) : Text {
    var slug : Text = "";
    for (char in word.chars()) {
      slug #= Char.toText(process_character(char));
    };
    slug;
  };

  // A 200 Ok response with picture
  public func picture(pic : Blob) : Response {
    {
      body = pic;
      headers = [
        ("Content-Type", "image/jpg"),
        ("Access-Control-Allow-Origin", "*")
        //("Expires", "Wed, 9 Jan 2099 09:09:09 GMT")
      ];
      status_code = 200;
      streaming_strategy = null;
    };
  };

  // A 404 response with an optional error message.
  public func http404(msg : ?Text) : Response {
    {
      body = Text.encodeUtf8(
        switch (msg) {
          case (?msg) msg;
          case null "Not found.";
        }
      );
      headers = [("Content-Type", "text/plain")];
      status_code = 404;
      streaming_strategy = null;
    };
  };

};
