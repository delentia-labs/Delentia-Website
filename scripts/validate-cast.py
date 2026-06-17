import json

errors = []
with open('public/assets/casts/dcpm_trace_simulation.cast', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f'Total lines: {len(lines)}')
for i, line in enumerate(lines):
    if not line.strip():
        continue
    try:
        obj = json.loads(line.strip())
        if i == 0:
            print(f'Header: version={obj.get("version")}, width={obj.get("width")}, height={obj.get("height")}')
    except Exception as e:
        errors.append(f'Line {i+1}: {e} | content: {repr(line[:80])}')

if errors:
    print('ERRORS:')
    for err in errors:
        print(' ', err)
else:
    print('[PASS] All lines are valid asciinema v2 JSON format')
