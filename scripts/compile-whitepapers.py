# scripts/compile-whitepapers.py
import os
import subprocess
import markdown

FOUNDATION_DIR = r"C:\Users\whale\delentia\Delentia-OS\docs\whitepapers\01_foundation"
OUTPUT_DIR = r"C:\Users\whale\delentia\Delentia-Website\public\assets"
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Compilation map: (source_markdown, output_pdf_name)
COMPILATION_MAP = [
    ("DELENTIA_OS_EXECUTIVE_SUMMARY_EN_2026.md", "whitepaper.pdf"),
    ("DELENTIA_OS_EXECUTIVE_SUMMARY_TH_2026.md", "whitepaper-th.pdf"),
    ("DELENTIA_OS_TECHNICAL_WHITEPAPER_EN_2026.md", "technical-whitepaper-en.pdf"),
    ("DELENTIA_OS_TECHNICAL_WHITEPAPER_TH_2026.md", "technical-whitepaper-th.pdf"),
    ("DELENTIA_OS_PUBLIC_WHITEPAPER_v2.2.0_DRAFT.md", "delentia-public-whitepaper-v2.2.0-draft.pdf")
]

# Premium Minimalist White CSS stylesheet for clean printing
CSS_STYLE = """
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap');
    
    @page {
        size: A4;
        margin: 2cm;
        @bottom-right {
            content: counter(page);
        }
    }
    
    body {
        font-family: 'Inter', 'Noto Sans Thai', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #27272a;
        background-color: #ffffff;
        line-height: 1.6;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
    }
    
    h1, h2, h3, h4, h5, h6 {
        color: #09090b;
        font-weight: 600;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
        page-break-after: avoid;
    }
    
    h1 {
        font-size: 24px;
        border-bottom: 2px solid #e4e4e7;
        padding-bottom: 0.3em;
        margin-top: 0;
    }
    
    h2 {
        font-size: 18px;
        border-bottom: 1px solid #f4f4f5;
        padding-bottom: 0.2em;
    }
    
    h3 {
        font-size: 15px;
    }
    
    p {
        margin-top: 0;
        margin-bottom: 1em;
        text-align: justify;
    }
    
    a {
        color: #b45309;
        text-decoration: none;
    }
    
    code {
        font-family: 'Geist Mono', Consolas, Monaco, monospace;
        font-size: 12px;
        background-color: #f4f4f5;
        padding: 0.2em 0.4em;
        border-radius: 4px;
        color: #0f172a;
    }
    
    pre {
        background-color: #f4f4f5;
        border: 1px solid #e4e4e7;
        padding: 1em;
        border-radius: 8px;
        overflow-x: auto;
        margin-bottom: 1.2em;
        page-break-inside: avoid;
    }
    
    pre code {
        background-color: transparent;
        padding: 0;
        border-radius: 0;
        color: inherit;
    }
    
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1.5em;
        page-break-inside: avoid;
    }
    
    th, td {
        padding: 0.6em 0.8em;
        border: 1px solid #e4e4e7;
        text-align: left;
        font-size: 13px;
    }
    
    th {
        background-color: #fafafa;
        font-weight: 600;
        color: #09090b;
    }
    
    tr:nth-child(even) {
        background-color: #fcfcfc;
    }
    
    blockquote {
        border-left: 4px solid #b45309;
        padding-left: 1em;
        margin-left: 0;
        margin-right: 0;
        color: #71717a;
        font-style: italic;
        background-color: #fffbeb;
        padding: 0.8em 1em 0.8em 1.5em;
        border-radius: 0 8px 8px 0;
    }
    
    ul, ol {
        margin-top: 0;
        margin-bottom: 1em;
        padding-left: 1.5em;
    }
    
    li {
        margin-bottom: 0.4em;
    }
    
    hr {
        border: 0;
        border-top: 1px solid #e4e4e7;
        margin: 2em 0;
        page-break-after: always;
    }
    
    /* Cover Page styling */
    .cover {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        page-break-after: always;
        text-align: center;
        padding-top: 5cm;
    }
    
    .cover h1 {
        font-size: 32px;
        border-bottom: none;
        margin-bottom: 0.2em;
        color: #b45309;
    }
    
    .cover h2 {
        font-size: 20px;
        border-bottom: none;
        color: #71717a;
        margin-top: 0.5em;
    }
    
    .metadata {
        margin-top: 4cm;
        font-size: 12px;
        color: #71717a;
    }
</style>
"""

def compile_pdf(src_filename, dest_filename):
    src_path = os.path.join(FOUNDATION_DIR, src_filename)
    if not os.path.exists(src_path):
        print(f"Error: Markdown source {src_path} not found.")
        return False
        
    print(f"\nCompiling {src_filename} to {dest_filename}...")
    
    with open(src_path, "r", encoding="utf-8") as f:
        md_text = f.read()
        
    # Convert Markdown to HTML
    # We use extra extensions for tables, code highlights, blockquotes, etc.
    html_body = markdown.markdown(md_text, extensions=['extra', 'codehilite', 'sane_lists', 'nl2br'])
    
    # Wrap in HTML template
    full_html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{dest_filename.replace('.pdf', '')}</title>
    {CSS_STYLE}
</head>
<body>
    {html_body}
</body>
</html>
"""

    # Write temporary HTML file
    temp_html_path = os.path.join(OUTPUT_DIR, src_filename.replace(".md", ".temp.html"))
    with open(temp_html_path, "w", encoding="utf-8") as f:
        f.write(full_html)
        
    # Output PDF path
    output_pdf_path = os.path.join(OUTPUT_DIR, dest_filename)
    
    # Run Edge print-to-pdf command directly
    args = [
        EDGE_PATH,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        f"--print-to-pdf={output_pdf_path}",
        f"file:///{temp_html_path.replace(chr(92), '/')}"
    ]
    
    try:
        result = subprocess.run(args, check=True, capture_output=True, text=True)
        print(result.stdout.strip())
        print(f"[SUCCESS] Success: Generated {output_pdf_path}")
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Failed to run Edge command: {e}")
        print(f"Stderr: {e.stderr}")
    finally:
        # Clean up temporary HTML file
        if os.path.exists(temp_html_path):
            os.remove(temp_html_path)

if __name__ == "__main__":
    # Ensure public/assets directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Run compilation for all whitepapers in map
    for src_file, dest_pdf in COMPILATION_MAP:
        compile_pdf(src_file, dest_pdf)
