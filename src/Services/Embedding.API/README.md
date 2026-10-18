# Embedding.API (Python)

Metni vektöre çeviren yüksek performanslı embedding servisi. API sözleşmesi HuggingFace TEI ile uyumludur;
Search.API veya Catalog.API sadece `EMBEDDING_URL` üzerinden bu servisi kullanabilir.

## Çalıştırma

```bash
cd src/Services/Embedding.API
uv sync
uv run uvicorn app.main:app --port 8000
```

Model, repo kökündeki `models/` klasöründen (HF cache formatı) yüklenir.

## Test

```bash
uv run python scripts/smoke_test.py
curl localhost:8000/embed -H 'Content-Type: application/json' -d '{"inputs":["kablosuz kulaklık"]}'
```

## Endpoint'ler

| Method | Path      | Açıklama                                   |
|--------|-----------|--------------------------------------------|
| POST   | `/embed`  | `{"inputs": str \| [str]}` → `[[float]]`   |
| GET    | `/health` | Model yüklüyse 200, değilse 503            |
| GET    | `/info`   | Model, boyut, cihaz, dtype bilgisi         |

## Ortam değişkenleri

| Değişken              | Varsayılan                                           |
|-----------------------|------------------------------------------------------|
| `EMBEDDING_MODEL_ID`  | `Trendyol/TY-ecomm-embed-multilingual-base-v1.2.0`   |
| `EMBEDDING_MODEL_DIR` | `<repo>/models`                                      |
| `EMBEDDING_DEVICE`    | `cuda` (varsa), yoksa `cpu`                          |
| `EMBEDDING_DTYPE`     | GPU'da `float16`, CPU'da `float32`                   |
| `EMBEDDING_MAX_BATCH` | `64`                                                 |

> Not: Model `trust_remote_code=True` ister (Alibaba-NLP/new-impl). Kod ilk yüklemede
> HuggingFace'ten indirilip `~/.cache/huggingface/modules` altına cache'lenir.
