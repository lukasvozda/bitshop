import Text "mo:base/Text";
import Char "mo:base/Char";

module {

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

};
