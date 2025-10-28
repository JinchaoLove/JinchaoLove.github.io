# pip install playwright && playwright install
import os
import sys
import re
import yaml
from glob import glob

PREFIX1 = """
<!DOCTYPE html>
<html lang="en" class="markmap-dark">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>"""

PREFIX2 = """</title>
    <style>
      .markmap {
        position: relative;
        width: 100%;
        height: 100vh;
      }
      .markmap-dark {
        background: #27272a;
        color: white;
      }
    </style>
    <script>
      window.markmap = {
        autoLoader: {
          toolbar: true
        }
      };
    </script>
    <script src="https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18"></script>
  </head>
  <body>
    <div class="markmap">
      <script type="text/template">
        ---
        markmap:
          maxWidth: 300
          colorFreezeLevel: 3
          initialExpandLevel: 3
          pan: false
          autoFit: true
          fitRatio: 0.7
        ---
"""

SUFFIX = """
      </script>
    </div>
  </body>
</html>
"""


def split_front_matter_and_content(content: str):
    """
    移除 YAML front matter，返回 (剩余内容, front_matter_data)
    """
    front_matter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not front_matter_match:
        return {}, content

    front_matter_text = front_matter_match.group(1)
    try:
        front_matter = yaml.safe_load(front_matter_text)
    except yaml.YAMLError:
        front_matter = {}

    # # 获取 title
    # title = front_matter.get("title", "")

    # 移除 front matter，插入 # title
    body_content = content[front_matter_match.end():]  # 去掉 front matter 部分
    return front_matter, body_content


def convert(path, tgt_dir="mindmap"):
    basename = os.path.basename(path)
    name, ext = os.path.splitext(basename)
    # post name format: YEAR-MONTH-DAY-title.md
    name = "-".join(name.split('-')[3:])
    if tgt_dir is None:
      tgt_dir = os.path.dirname(path)
    os.makedirs(os.path.join(tgt_dir, name), exist_ok=True)
    html_path = os.path.join(tgt_dir, name, "index.html")

    # 把markdown转换成html
    with open(path, 'r') as f:
        markdown_content = f.read()

    front_matter, markdown_content = split_front_matter_and_content(markdown_content)
    title = front_matter.get("title", "Marmap")
    markdown_content = f"\n#{title}\n\n" + markdown_content
    html_content = PREFIX1 + title + PREFIX2 + markdown_content + SUFFIX
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html_content)


def convert_all(src_dir="_posts", tgt_dir="mindmap"):
    files = glob(os.path.join(src_dir, "**/*.html"), recursive=True)
    for f in files:
       os.remove(f)

    files = glob(os.path.join(src_dir, "**/*.md"), recursive=True)
    for f in files:
       convert(f, tgt_dir=tgt_dir)


if __name__ == '__main__':
    # python tools/generate_markmap.py convert _posts/2019-08-08-text-and-typography.md
    args = sys.argv
    # args[0] = current file
    # args[1] = function name
    # args[2:] = function args : (*unpacked)
    globals()[args[1]](*args[2:])
