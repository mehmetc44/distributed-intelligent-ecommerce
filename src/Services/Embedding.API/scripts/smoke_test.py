"""Smoke test for the embedding service.

Usage (service must be running):
    uv run python scripts/smoke_test.py [base_url]
"""

import sys
import time

import httpx

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8000"


def cos(a: list[float], b: list[float]) -> float:
    # Vectors are L2-normalized, so dot product == cosine similarity.
    return sum(x * y for x, y in zip(a, b))


def main() -> None:
    with httpx.Client(base_url=BASE, timeout=60) as c:
        print("health:", c.get("/health").json())
        print("info:  ", c.get("/info").json())

        query = "kablosuz kulaklık"
        docs = [
            "Bluetooth 5.3 Kulak İçi Kulaklık, Gürültü Önleyici",
            "Kablolu Oyuncu Kulaklığı Mikrofonlu",
            "Erkek Pamuklu Basic Tişört Siyah",
            "Paslanmaz Çelik Düdüklü Tencere 6 Litre",
        ]

        t = time.perf_counter()
        vecs = c.post("/embed", json={"inputs": [query, *docs]}).json()
        ms = (time.perf_counter() - t) * 1000

        print(f"\n{len(vecs)} vectors, dim={len(vecs[0])}, {ms:.0f} ms (batch of {len(vecs)})")
        print(f"\nquery: {query!r}")
        for doc, v in sorted(zip(docs, vecs[1:]), key=lambda p: -cos(vecs[0], p[1])):
            print(f"  {cos(vecs[0], v):.3f}  {doc}")

        # single-request latency (warm)
        lat = []
        for _ in range(10):
            t = time.perf_counter()
            c.post("/embed", json={"inputs": query})
            lat.append((time.perf_counter() - t) * 1000)
        lat.sort()
        print(f"\nsingle query latency: p50={lat[5]:.1f} ms  max={lat[-1]:.1f} ms")


if __name__ == "__main__":
    main()
