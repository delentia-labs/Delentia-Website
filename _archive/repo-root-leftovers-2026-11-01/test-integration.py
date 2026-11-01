#!/usr/bin/env python3
"""Integration test: rctlabs-v0 frontend <> L3 API backend"""
import urllib.request
import json
import sys

API = "http://localhost:8003"
FE = "http://localhost:3010"
passed = 0
failed = 0


def test(name, condition, detail=""):
    global passed, failed
    if condition:
        passed += 1
        print(f"  PASS  {name}")
    else:
        failed += 1
        print(f"  FAIL  {name} -- {detail}")


def api_chat(msg):
    req = urllib.request.Request(
        f"{API}/rctlabs/assistant/chat",
        data=json.dumps({
            "user_id": "integration_test",
            "message": msg,
            "language": "en",
            "channel": "web",
        }).encode(),
        headers={"Content-Type": "application/json"},
    )
    resp = urllib.request.urlopen(req, timeout=30)
    return json.loads(resp.read().decode())


def api_get(path):
    resp = urllib.request.urlopen(f"{API}{path}", timeout=10)
    return json.loads(resp.read().decode())


def http_status(url):
    try:
        resp = urllib.request.urlopen(url, timeout=10)
        return resp.status
    except Exception as e:
        return str(e)


print("=== 1. SERVICE HEALTH ===")
test("L3 API running", http_status(f"{API}/health") == 200)
test("Frontend running", http_status(FE) == 200)
h = api_get("/health")
test("Ollama enabled", h.get("ollama_enabled") is True)
test("Cache enabled", h.get("cache_enabled") is True)
test("Model chain present", len(h.get("ollama_model_chain", [])) >= 2)

print()
print("=== 2. KNOWLEDGE BASE QUERIES ===")
kb_queries = [
    ("What is RCT?", "rct"),
    ("How does JITNA work?", "jitna"),
    ("What is SignedAI?", "signedai"),
    ("What is FDIA?", "fdia"),
    ("What is DelentiaAI?", "delentiaai"),
]
for q, expected_topic in kb_queries:
    r = api_chat(q)
    src = r.get("source", "")
    test(f"{q} -> source=KB", src == "knowledge_base", f"got {src}")
    test(f"{q} -> has reply", len(r.get("reply", "")) > 10)

print()
print("=== 3. INTENT DETECTION ===")
r = api_chat("hello")
test("Greeting intent", r.get("intent") == "greeting", f"got {r.get('intent')}")
r = api_chat("Who created RCT?")
test(
    "Creator query",
    r.get("intent") == "creator_query" or r.get("topic") == "architect",
    f"got intent={r.get('intent')} topic={r.get('topic')}",
)

print()
print("=== 4. SUGGESTIONS ===")
r = api_chat("What is RCT?")
test("Has suggestions", len(r.get("suggestions", [])) > 0, "no suggestions")
test("Suggestions are strings", all(isinstance(s, str) for s in r.get("suggestions", [])))

print()
print("=== 5. ALGORITHM REGISTRY ===")
algos = api_get("/algorithms")
test("Algorithms endpoint", "total" in algos or "by_tier" in algos)
test("Has tier breakdown", "by_tier" in algos)

print()
print("=== 6. METRICS & CACHE ===")
m = api_get("/metrics")
test("Metrics endpoint", "analytics" in m or "response_time" in m or "total_requests" in m)
c = api_get("/cache/stats")
test("Cache stats", "size" in c or "max_size" in c or "hits" in c)

print()
print("=== 7. MODELS ENDPOINT ===")
models = api_get("/models")
test("Models endpoint", "model_chain" in models or "primary" in models)

print()
print("=== 8. CORS CHECK ===")
req = urllib.request.Request(f"{API}/health", headers={"Origin": "http://localhost:3010"})
resp = urllib.request.urlopen(req, timeout=5)
cors_header = resp.headers.get("access-control-allow-origin", "")
test("CORS allows 3010", cors_header == "http://localhost:3010" or cors_header == "*", f"got: {cors_header}")

print()
print("=" * 45)
print(f"  PASSED: {passed}")
print(f"  FAILED: {failed}")
print("=" * 45)
if failed == 0:
    print("ALL INTEGRATION TESTS PASSED!")
else:
    print(f"{failed} test(s) failed.")
sys.exit(0 if failed == 0 else 1)
