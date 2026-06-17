# scripts/rebrand_whitepapers.py
import os
import re

FOUNDATION_DIR = r"C:\Users\whale\delentia\Delentia-OS\docs\whitepapers\01_foundation"
PRIVATE_V9_DIR = r"C:\Users\whale\delentia\Delentia-Private-OS\docs\whitepaper\v9"

# Files to read and write
src_summary_en = os.path.join(FOUNDATION_DIR, "RCT_ECOSYSTEM_WHITEPAPER_v2.1.0_SUMMARY.md")
dest_summary_en = os.path.join(FOUNDATION_DIR, "DELENTIA_OS_EXECUTIVE_SUMMARY_EN_2026.md")

src_tech_th = os.path.join(FOUNDATION_DIR, "RCT_ECOSYSTEM_WHITEPAPER_TH_2026.md")
dest_tech_th = os.path.join(FOUNDATION_DIR, "DELENTIA_OS_TECHNICAL_WHITEPAPER_TH_2026.md")

src_tech_en = os.path.join(PRIVATE_V9_DIR, "RCT-Ecosystem-Complete-WhitePaper-v1.md")
dest_tech_en = os.path.join(FOUNDATION_DIR, "DELENTIA_OS_TECHNICAL_WHITEPAPER_EN_2026.md")

def rebrand_text(text, is_thai=False):
    # Rebrand names
    text = text.replace("RCT Ecosystem", "Delentia OS")
    text = text.replace("RCT ECOSYSTEM", "DELENTIA OS")
    text = text.replace("rct-ecosystem", "delentia-os")
    text = text.replace("RCT-Ecosystem", "Delentia-OS")
    text = text.replace("RCT OS", "Delentia OS")
    text = text.replace("RCT Labs", "Delentia Labs")
    text = text.replace("RCTLabs", "Delentia Labs")
    text = text.replace("ArtentAI", "Delentia AI")
    text = text.replace("Artent AI", "Delentia AI")
    text = text.replace("DelentiaDB", "DelentiaDB")
    text = text.replace("rctdb", "delentiadb")
    text = text.replace("RCTDB", "DelentiaDB")
    
    # Update metrics
    text = text.replace("36 algorithms", "41 algorithms")
    text = text.replace("36 Algorithms", "41 Algorithms")
    text = text.replace("36 อัลกอริทึม", "41 อัลกอริทึม")
    
    text = text.replace("345 tests", "389 tests")
    text = text.replace("345 Tests", "389 Tests")
    text = text.replace("345 การทดสอบ", "389 การทดสอบ")
    text = text.replace("344/345", "389/390")
    text = text.replace("389/390 (99.7%)", "389/390 (99.7%)")
    text = text.replace("389/390 passed", "389/390 passed")
    text = text.replace("389/390 ผ่าน", "389/390 ผ่าน")
    
    text = text.replace("105,000+ examples", "207,000+ examples")
    text = text.replace("105,000+ ตัวอย่าง", "207,000+ ตัวอย่าง")
    text = text.replace("105,000 property-based", "207,000 property-based")
    text = text.replace("105,000 examples", "207,000 examples")
    
    # Remove GPA and failures from bio
    if is_thai:
        # Check Thai bio if any
        pass
    else:
        # English summary/tech bio edits
        text = text.replace("4 business failures, GPA 1.41", "self-taught AI innovator")
        text = text.replace("GPA 1.41, 4 business failures", "self-taught AI innovator")
        text = text.replace("GPA 1.41", "self-taught")
        text = text.replace("4 business failures", "self-taught")
        text = text.replace("Klong Toei slum, GPA 1.41, 4 business failures", "Klong Toei slum origin, self-taught AI innovator")
        text = text.replace("Klong Toei slum origin, 4 business failures, GPA 1.41", "Klong Toei slum origin, self-taught AI innovator")
        text = text.replace("Klong Toey → Business failures → Self-taught path → RCT", "Klong Toey → Self-taught path → Delentia OS")
        text = text.replace("failures → RCT", "Self-taught path → Delentia OS")
        text = text.replace("failures → RCT", "Self-taught path ➔ Delentia OS")
        
    return text

def process_file(src_path, dest_path, is_thai=False):
    print(f"Processing {src_path} -> {dest_path}")
    if not os.path.exists(src_path):
        print(f"Error: Source file {src_path} does not exist.")
        return False
        
    with open(src_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    rebranded_content = rebrand_text(content, is_thai)
    
    with open(dest_path, "w", encoding="utf-8") as f:
        f.write(rebranded_content)
        
    print(f"Successfully wrote {dest_path}")
    return True

if __name__ == "__main__":
    process_file(src_summary_en, dest_summary_en, is_thai=False)
    process_file(src_tech_th, dest_tech_th, is_thai=True)
    process_file(src_tech_en, dest_tech_en, is_thai=False)
