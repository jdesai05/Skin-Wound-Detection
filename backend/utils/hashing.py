import hmac,hashlib

def self_hmac_hash(s: str,key:str) -> str:
        return hmac.new(key.encode(), s.encode(), hashlib.sha256).hexdigest()

def verify_self_hmac(s: str, given_hash: str, key:str) -> bool:
    expected = self_hmac_hash(s,key)
    return hmac.compare_digest(expected, given_hash)