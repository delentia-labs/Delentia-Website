file_path = r"c:\Users\whale\delentia\Delentia-Private-OS\whitepapers\01_foundation\RCT_ECOSYSTEM_WHITEPAPER_TH_2026.md"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

import re
for word in ["LoRA", "SLM", "1+4", "เสาหลัก"]:
    matches = list(re.finditer(word, text, re.IGNORECASE))
    print(f"Matches for '{word}': {len(matches)}")
