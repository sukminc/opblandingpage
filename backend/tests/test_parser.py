from app.parser import parse_filename, split_hands, parse_hand


def test_parse_filename_basic():
    result = parse_filename("GG20260102-0122 - #19 26 The Year Begins.txt")
    assert result["gg_id"] == "GG20260102-0122"
    assert "Year Begins" in result["name"]
    assert result["date"].year == 2026


def test_parse_filename_bounty():
    result = parse_filename("GG20260103-0233 - Mini Friday Night Fight 25 [Bounty 6-Max].txt")
    assert result["gg_id"] == "GG20260103-0233"
    assert result["bounty"] > 0
    assert "Bounty" in result["format"]


def test_split_hands_empty():
    assert split_hands("") == []


def test_split_hands_single():
    text = """Poker Hand #RC1234-56789: Tournament #999, $1/$2 No Limit Hold'em - 2026/01/02 01:22:00
Seat 1: Hero (5000 in chips)
*** HOLE CARDS ***
Dealt to Hero [Ah Kd]
Hero: folds
*** SUMMARY ***
"""
    blocks = split_hands(text)
    assert len(blocks) == 1


def test_parse_hand_basic():
    text = """Poker Hand #RC1234-56789: Tournament #999, $1/$2 No Limit Hold'em - 2026/01/02 01:22:00
Table '999 1' 9-max
#1 is the button
Seat 1: Hero (5000 in chips)
Seat 2: Villain (4000 in chips)
*** HOLE CARDS ***
Dealt to Hero [Ah Kd]
Villain: raises $200 to $400
Hero: folds
*** SUMMARY ***
Villain collected $200
"""
    hand = parse_hand(text, hero_name="Hero")
    assert hand is not None
    assert hand["hero_name"] == "Hero"
    assert hand["action"] == "folds"
    assert hand["action_street"] == "preflop"
