import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import List "mo:base/List";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Types "./Types";
import Pigs "./pigs_nfts";

shared actor class GameBackend() = Self {

  // Define a type for cards
  type Card = Nat;

  // Define a type for players
  type Player = {
      id : Principal;
      cards : [Card];
  };

  // Define a type for the game state
  type Match = {
    id: Nat;
    player1 : Player;
    player2 : Player;
    winner : ?Player;
  };

  // Function to match players
  // public func joinGame(playerId : Principal, cards: [Card]) : async Result.Result<Player, Text> {
  //   return #ok();
  // };
}
