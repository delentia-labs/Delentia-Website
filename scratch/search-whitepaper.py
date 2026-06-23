file_path = r"c:\Users\whale\delentia\Delentia-Private-OS\whitepapers\01_foundation\RCT_ECOSYSTEM_WHITEPAPER_COMPLETE_2026.md"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

output_lines = []
for i, line in enumerate(lines):
    if line.startswith("#"):
        output_lines.append(f"Line {i+1}: {line.strip()}")

with open("scratch/headings.txt", "w", encoding="utf-8") as out:
    out.write("\n".join(output_lines))

print("Done! Headings written to scratch/headings.txt")
