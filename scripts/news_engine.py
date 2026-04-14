# scripts/news_engine.py
import os
import sqlite3
import markdown
import json
from datetime import datetime
from jinja2 import Environment, FileSystemLoader

# ==========================================
# ⚙️ 适配 Next.js 的路径配置
# ==========================================
# 向上退一级到 Next.js 根目录，并指向 public 文件夹
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'public'))
DB_FILE = os.path.join(os.path.dirname(__file__), 'taohuayuan_news.db')
TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), 'templates')

CATEGORIES = ['news', 'release', 'whitepaper', 'resource']

def init_env():
    """初始化数据库表和 Next.js 的 public 子目录"""
    for cat in CATEGORIES:
        os.makedirs(os.path.join(OUTPUT_DIR, cat), exist_ok=True)
    os.makedirs(os.path.join(OUTPUT_DIR, 'api'), exist_ok=True)
    
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, category TEXT NOT NULL,
            content_md TEXT NOT NULL, content_html TEXT NOT NULL,
            seo_keywords TEXT, seo_desc TEXT, published_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def publish_article(title, category, content_md, seo_keywords="", seo_desc=""):
    date_str = datetime.now().strftime('%Y%m%d')
    timestamp = int(datetime.now().timestamp())
    slug = f"thy-{date_str}-{timestamp}"
    published_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # 1. Markdown 转 HTML (启用代码高亮和表格)
    html_content = markdown.markdown(content_md, extensions=['extra', 'codehilite', 'tables'])

    # 2. Jinja2 渲染静态页面 (匹配 Next.js 黑客主题)
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template('article_template.html')
    final_html = template.render(
        title=title, category=category, slug=slug,
        content_html=html_content, seo_keywords=seo_keywords,
        seo_desc=seo_desc, published_at=published_at
    )

    # 3. 入库
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO articles (title, slug, category, content_md, content_html, seo_keywords, seo_desc, published_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (title, slug, category, content_md, html_content, seo_keywords, seo_desc, published_at))
    conn.commit()
    conn.close()

    # 4. 生成双轨静态文件到 Next.js 的 public 目录
    with open(os.path.join(OUTPUT_DIR, category, f"{slug}.html"), 'w', encoding='utf-8') as f:
        f.write(final_html)
    with open(os.path.join(OUTPUT_DIR, category, f"{slug}.md"), 'w', encoding='utf-8') as f:
        f.write(content_md)

    update_homepage_api()
    print(f"✅ [发布成功] 静态资源已推送至 Next.js Public 目录: /{category}/{slug}.html")

def update_homepage_api():
    """生成 latest.json 供 src/app/page.tsx 的 React 组件调用"""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    latest_data = {cat: [] for cat in CATEGORIES}
    for cat in CATEGORIES:
        cursor.execute('SELECT title, slug, published_at FROM articles WHERE category = ? ORDER BY published_at DESC LIMIT 5', (cat,))
        for row in cursor.fetchall():
            latest_data[cat].append({"title": row["title"], "slug": row["slug"], "date": row["published_at"][:10]})
    conn.close()
    
    with open(os.path.join(OUTPUT_DIR, 'api', 'latest.json'), 'w', encoding='utf-8') as f:
        json.dump(latest_data, f, ensure_ascii=False, indent=2)