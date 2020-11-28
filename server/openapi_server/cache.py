import os

from flask_caching import Cache
from dotenv import load_dotenv

load_dotenv()

blob_config = {
    "CACHE_TYPE": "redis", # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 2592000, # 30 days
    "CACHE_REDIS_HOST": os.getenv('CACHE_REDIS_HOST') or 'redis',
    "CACHE_REDIS_PORT": os.getenv('CACHE_REDIS_PORT') or '6379',
    "CACHE_KEY_PREFIX": "blob_"
}

translation_config = {
    "CACHE_TYPE": "redis", # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 2592000, # 30 days
    "CACHE_REDIS_HOST": os.getenv('CACHE_REDIS_HOST') or 'redis',
    "CACHE_REDIS_PORT": os.getenv('CACHE_REDIS_PORT') or '6379',
    "CACHE_KEY_PREFIX": "translation_"
}

blob_cache = Cache(config=blob_config)


translation_cache = Cache(config=translation_config)
