let upstream = https://github.com/dfinity/vessel-package-set/releases/download/mo-0.8.1-20230203/package-set.dhall sha256:ce3e668c547863e153abade18d758087296d2f5b6c20ed98076c2e4628e109aa
let Package =
    { name : Text, version : Text, repo : Text, dependencies : List Text }

let
  -- This is where you can add your own packages to the package-set
additions = [
  { name = "array"
  , version = "v0.2.1"
  , repo = "https://github.com/aviate-labs/array.mo"
  , dependencies = [ "base" ] : List Text
  },
  { name = "encoding"
  , version = "v0.4.0"
  , repo = "https://github.com/aviate-labs/encoding.mo"
  , dependencies = [ "base", "array" ]
  },
  { name = "io"
  , version = "v0.3.2"
  , repo = "https://github.com/aviate-labs/io.mo"
  , dependencies = [ "base" ]
  },
  { name = "uuid"
  , repo = "https://github.com/aviate-labs/uuid.mo"
  , version = "v0.2.0"
  , dependencies = ["base", "array", "encoding", "io"] : List Text
  },
  { name = "sha"
  , repo = "https://github.com/tgalal/motoko-sha"
  , version = "a6d46445670407d51996c42892f696ed34d6296b"
  , dependencies = ["base"] : List Text
  },
  { name = "bitcoin"
  , repo = "https://github.com/tgalal/motoko-bitcoin"
  , version = "8615a5f1b699d60b64833622cb128c20a2c8cb6b"
  , dependencies = ["base", "sha"] : List Text
  }
] : List Package


let
  {- This is where you can override existing packages in the package-set

     For example, if you wanted to use version `v2.0.0` of the foo library:
     let overrides = [
         { name = "foo"
         , version = "v2.0.0"
         , repo = "https://github.com/bar/foo"
         , dependencies = [] : List Text
         }
     ]
  -}
  overrides =
    [] : List Package

in  upstream # additions # overrides
