import logging
import time
from typing import List
import numpy as np
import torch
from sentence_transformers import SentenceTransformer

from app.config import settings

log = logging.getLogger("embedding.engine")

class EmbeddingEngine:
    """SentenceTransformer modelini ve çıkarım (inference) işlemlerini yöneten sınıf."""

    def __init__(self):
        self._model: SentenceTransformer | None = None
        self._dimension: int | None = None

    @property
    def is_ready(self) -> bool:
        return self._model is not None

    @property
    def dimension(self) -> int | None:
        return self._dimension

    @property
    def max_seq_length(self) -> int | None:
        return getattr(self._model, "max_seq_length", None) if self._model else None

    def load(self) -> None:
        """Modeli diskten/cache'ten okuyup GPU veya CPU'ya yükler."""
        log.info(
            "Model yükleniyor: %s | Cihaz: %s | Dtype: %s | Dizin: %s",
            settings.model_id,
            settings.device,
            settings.dtype,
            settings.model_dir,
        )
        start_time = time.perf_counter()

        model = SentenceTransformer(
            settings.model_id,
            cache_folder=settings.model_dir,
            device=settings.device,
            trust_remote_code=True,
        )

        if settings.dtype == "float16" and settings.device == "cuda":
            model.half()

        model.eval()

        self._model = model
        # SentenceTransformers sürüm uyumluluğu için
        get_dim = getattr(model, "get_embedding_dimension", None) or model.get_sentence_embedding_dimension
        self._dimension = get_dim()

        elapsed = time.perf_counter() - start_time
        log.info("Model hazır! Boyut: %d | Yüklenme süresi: %.2f sn", self._dimension, elapsed)

    def unload(self) -> None:
        """Modeli bellekten temizler."""
        self._model = None
        self._dimension = None
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
        log.info("Model bellekten boşaltıldı.")

    def encode(self, texts: List[str], normalize: bool = True) -> List[List[float]]:
        """Metin listesini alır ve 768 boyutlu float vektör matrisine dönüştürür."""
        if not self._model:
            raise RuntimeError("Model henüz belleğe yüklenmedi.")

        with torch.inference_mode():
            vectors: np.ndarray = self._model.encode(
                texts,
                batch_size=settings.max_batch,
                normalize_embeddings=normalize,
                convert_to_numpy=True,
            )

        # NaN / Bozuk değer kontrolü (Örn: GPU fp16 taşma durumu)
        if not (vectors == vectors).all():
            raise ValueError("Model NaN üretti! EMBEDDING_DTYPE=float32 olarak deneyin.")

        return vectors.astype("float32").tolist()

# Singleton engine nesnesi
engine = EmbeddingEngine()
