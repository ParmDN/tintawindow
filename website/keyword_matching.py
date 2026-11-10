"""Report exact phrases separately from explicitly defined grammatical service variants."""
import re,unicodedata
def fold(s):return ''.join(c for c in unicodedata.normalize('NFD',s) if not unicodedata.combining(c)).lower()
def exact_matches(text,keyword):
 return len(re.findall(r'(?<!\w)'+re.escape(' '.join(fold(keyword).split())).replace(r'\ ',r'\s+')+r'(?!\w)',' '.join(fold(text).split())))
def normal(text):return ' '.join(re.sub(r'[-‐‑–]', ' ',fold(text)).replace('&',' and ').split())
def natural_matches(text,keyword):
 s,k=normal(text),normal(keyword)
 m=re.match(r'(.+?) (christchurch|ashburton|timaru|oamaru|queenstown|wanaka|cromwell|lake tekapo|arrowtown|temuka|geraldine)$',k)
 if m:
  base=re.sub(r'\s+(in|across|for)$','',m[1]);pattern=re.escape(base)+r'(?:\s+(?:in|across|for))?\s+'+re.escape(m[2])
 else:pattern=re.escape(k)
 return len(re.findall(r'(?<!\w)'+pattern+r'(?!\w)',s))
