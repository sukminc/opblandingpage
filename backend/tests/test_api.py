import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.db import get_db, Base

TEST_DB = "sqlite:///./test.db"
engine = create_engine(TEST_DB, connect_args={"check_same_thread": False})
TestingSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSession()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_signals_empty():
    r = client.get("/analytics/signals")
    assert r.status_code == 200
    data = r.json()
    assert data["total_tournaments"] == 0


def test_pnl_empty():
    r = client.get("/analytics/pnl")
    assert r.status_code == 200
    assert r.json() == []


def test_ingest_txt():
    raw = """Poker Hand #RC0001-00001: Tournament #001, $1/$2 No Limit Hold'em - 2026/01/02 01:22:00
Table '001 1' 9-max
#1 is the button
Seat 1: TestHero (5000 in chips)
Seat 2: Villain (4000 in chips)
*** HOLE CARDS ***
Dealt to TestHero [Ah Kd]
Villain: raises $200 to $400
TestHero: folds
*** SUMMARY ***
Villain collected $200
"""
    r = client.post(
        "/ingest",
        files={"file": ("GG20260102-0122 - Test Tourney 26.txt", raw.encode(), "text/plain")},
        params={"hero_name": "TestHero"},
    )
    assert r.status_code == 200
    data = r.json()
    assert data["hands_inserted"] >= 0
