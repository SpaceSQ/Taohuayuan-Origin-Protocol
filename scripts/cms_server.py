import os
import sqlite3
import markdown
import json
import shutil
from datetime import datetime
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from jinja2 import Environment, FileSystemLoader

app = FastAPI(title="Taohuayuan CMS v1.4")

# ==========================================
# ⚙️ 核心路径配置
# ==========================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
NEXT_PUBLIC_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', 'public'))
UPLOAD_DIR = os.path.join(NEXT_PUBLIC_DIR, 'uploads', 'news')
DB_FILE = os.path.join(BASE_DIR, 'taohuayuan_news.db')
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')

CATEGORIES = ['news', 'release', 'whitepaper', 'resource']

os.makedirs(UPLOAD_DIR, exist_ok=True)
for cat in CATEGORIES: os.makedirs(os.path.join(NEXT_PUBLIC_DIR, cat), exist_ok=True)
os.makedirs(os.path.join(NEXT_PUBLIC_DIR, 'api'), exist_ok=True)

conn = sqlite3.connect(DB_FILE)
conn.execute('''CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, slug TEXT UNIQUE, 
    category TEXT, content_md TEXT, content_html TEXT, 
    seo_keywords TEXT, seo_desc TEXT, published_at DATETIME)''')
conn.commit()
conn.close()

# ==========================================
# 🔄 核心刷新逻辑
# ==========================================
def update_latest_json():
    latest_data = {cat: [] for cat in CATEGORIES}
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    try:
        for cat in CATEGORIES:
            rows = conn.execute('SELECT title, slug, published_at FROM articles WHERE category=? ORDER BY published_at DESC LIMIT 5', (cat,)).fetchall()
            for r in rows:
                latest_data[cat].append({"title": r["title"], "slug": r["slug"], "date": r["published_at"][:10]})
    finally:
        conn.close()
        
    with open(os.path.join(NEXT_PUBLIC_DIR, 'api', 'latest.json'), 'w', encoding='utf-8') as f:
        json.dump(latest_data, f, ensure_ascii=False, indent=2)

def update_api_and_files(article_data):
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    template = env.get_template('article_template.html')
    final_html = template.render(**article_data)
    
    category_path = os.path.join(NEXT_PUBLIC_DIR, article_data['category'])
    with open(os.path.join(category_path, f"{article_data['slug']}.html"), 'w', encoding='utf-8') as f:
        f.write(final_html)
    with open(os.path.join(category_path, f"{article_data['slug']}.md"), 'w', encoding='utf-8') as f:
        f.write(article_data['content_md'])
    update_latest_json()

# ==========================================
# 🚀 接口定义
# ==========================================
@app.post("/api/upload")
async def upload(image: UploadFile = File(...)):
    filename = f"{datetime.now().strftime('%Y%m%d%H%M%S')}_{image.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as f: shutil.copyfileobj(image.file, f)
    return {"data": {"filePath": f"/uploads/news/{filename}"}}

@app.post("/api/publish")
async def publish(
    title: str = Form(...), category: str = Form(...), content_md: str = Form(...), 
    seo_keywords: str = Form(""), seo_desc: str = Form(""), edit_slug: str = Form("")
):
    print(f"📥 [后端雷达] 收到发布/更新请求: {title}")
    is_edit = bool(edit_slug and edit_slug.strip())
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    
    try:
        if is_edit:
            slug = edit_slug
            old_row = conn.execute('SELECT published_at, category FROM articles WHERE slug=?', (slug,)).fetchone()
            if not old_row: return {"status": "error", "message": "找不到该文章"}
            pub_at = old_row['published_at']
            
            if old_row['category'] != category:
                for ext in ['.html', '.md']:
                    old_path = os.path.join(NEXT_PUBLIC_DIR, old_row['category'], f"{slug}{ext}")
                    if os.path.exists(old_path): os.remove(old_path)
        else:
            slug = f"thy-{datetime.now().strftime('%Y%m%d')}-{int(datetime.now().timestamp())}"
            pub_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        html_body = markdown.markdown(content_md, extensions=['extra', 'tables', 'fenced_code'])
        
        if is_edit:
            conn.execute('''UPDATE articles SET title=?, category=?, content_md=?, content_html=?, seo_keywords=?, seo_desc=? WHERE slug=?''',
                       (title, category, content_md, html_body, seo_keywords, seo_desc, slug))
        else:
            conn.execute('''INSERT INTO articles (title, slug, category, content_md, content_html, seo_keywords, seo_desc, published_at) 
                          VALUES (?,?,?,?,?,?,?,?)''', (title, slug, category, content_md, html_body, seo_keywords, seo_desc, pub_at))
        conn.commit()
    finally:
        conn.close()
            
    article_data = {"title": title, "slug": slug, "category": category, "content_md": content_md, "content_html": html_body, "seo_keywords": seo_keywords, "seo_desc": seo_desc, "published_at": pub_at}
    update_api_and_files(article_data)
    action_text = "更新" if is_edit else "发布"
    print(f"✅ [后端雷达] {action_text}成功!")
    return {"status": "success", "message": f"{action_text}成功！路径: /{category}/{slug}.html"}

@app.get("/api/articles")
async def get_all_articles():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    try:
        rows = conn.execute('SELECT title, slug, category, published_at FROM articles ORDER BY published_at DESC').fetchall()
        return [{"title": r["title"], "slug": r["slug"], "category": r["category"], "date": r["published_at"]} for r in rows]
    finally:
        conn.close()

@app.get("/api/article/{slug}")
async def get_single_article(slug: str):
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    try:
        row = conn.execute('SELECT * FROM articles WHERE slug=?', (slug,)).fetchone()
        if not row: raise HTTPException(404)
        return dict(row)
    finally:
        conn.close()

# 👉 改用 POST 请求，彻底绕过 GET 缓存
@app.post("/api/delete/{slug}")
async def delete(slug: str):
    print(f"🔥 [后端雷达] 收到强力粉碎请求，目标标识: {slug}")
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    try:
        row = conn.execute('SELECT category FROM articles WHERE slug=?', (slug,)).fetchone()
        if not row: 
            print("⚠️ [后端雷达] 数据不存在")
            return {"status": "error", "message": "不存在的节点"}
        
        conn.execute('DELETE FROM articles WHERE slug=?', (slug,))
        conn.commit()
        
        # 物理删除文件 (加入容错机制)
        for ext in ['.html', '.md']:
            p = os.path.join(NEXT_PUBLIC_DIR, row['category'], f"{slug}{ext}")
            try:
                if os.path.exists(p): 
                    os.remove(p)
                    print(f"🗑️ [后端雷达] 已物理粉碎: {p}")
            except Exception as e:
                print(f"⚠️ [后端雷达] 文件删除权限受限: {e}")
                
    finally:
        conn.close()
        
    update_latest_json() 
    print("✅ [后端雷达] 抹除流程全量完成")
    return {"status": "success", "message": f"[{slug}] 数据基质已彻底清除。"}

# ==========================================
# 🖥️ 强制缓存刷新与内嵌提示 UI (完全抛弃 alert)
# ==========================================
@app.get("/", response_class=HTMLResponse)
async def admin_page():
    html = """
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>S2 Matrix CMS v1.4</title>
        <link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css">
        <script src="https://unpkg.com/easymde/dist/easymde.min.js"></script>
        <style>
            body { background: #050508; color: #e2e8f0; font-family: monospace; padding: 20px; display: flex; gap: 20px; }
            .sidebar { width: 300px; background: #111; padding: 20px; border: 1px solid #333; border-radius: 8px; overflow-y: auto; height: 90vh; }
            .main { flex: 1; background: #111; padding: 30px; border: 1px solid #333; border-radius: 8px; position: relative; }
            h1, h2 { color: #00f3ff; border-bottom: 1px dashed #333; padding-bottom: 10px; }
            .form-group { margin-bottom: 20px; }
            label { display: block; margin-bottom: 8px; color: #ff6b81; }
            input, select { width: 100%; padding: 10px; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; box-sizing: border-box; }
            button { background: #00f3ff; color: #000; padding: 12px 24px; border: none; font-weight: bold; cursor: pointer; border-radius: 4px; transition: 0.3s; width: 100%; }
            button:hover { background: #fff; box-shadow: 0 0 15px #00f3ff; }
            .article-item { background: #000; border: 1px solid #333; padding: 10px; margin-bottom: 10px; border-radius: 4px; }
            .article-item h4 { margin: 0 0 5px 0; color: #fff; font-size: 14px; }
            .article-item p { margin: 0 0 10px 0; color: #666; font-size: 12px; }
            .btn-edit { background: transparent; border: 1px solid #ffbd2e; color: #ffbd2e; width: 48%; padding: 5px; }
            .btn-del { background: transparent; border: 1px solid #ff6b81; color: #ff6b81; width: 48%; padding: 5px; }
            .CodeMirror { background: #000; color: #00f3ff; border-color: #333; }
            .editor-toolbar { background: #222; border-color: #333; }
            .editor-toolbar button { color: #fff !important; }
            
            /* ✨ 新增：内嵌提示框 (取代 alert) */
            #status-box { 
                padding: 15px; margin-bottom: 20px; border-radius: 4px; font-weight: bold; 
                display: none; text-align: center; font-size: 16px;
            }
        </style>
    </head>
    <body>
        <div class="sidebar">
            <h2>📜 历史脉络 v1.4</h2>
            <button onclick="clearForm()" style="margin-bottom: 20px; background: transparent; border: 1px solid #00f3ff; color: #00f3ff;">+ 新建撰写 (New)</button>
            <div id="article-list">加载中...</div>
        </div>
        <div class="main">
            <h1 id="mode-title">📡 S2 Matrix CMS v1.4 - 新建广播</h1>
            
            <div id="status-box"></div>

            <form id="publish-form">
                <input type="hidden" id="edit_slug" value="">
                <div class="form-group"><label>标题 (Title)</label><input type="text" id="title" required></div>
                <div class="form-group">
                    <label>频道 (Category)</label>
                    <select id="category">
                        <option value="news">📺 桃花源新闻</option>
                        <option value="release">🚀 版本发布</option>
                        <option value="whitepaper">📜 白皮书</option>
                        <option value="resource">💾 资料站</option>
                    </select>
                </div>
                <div style="display: flex; gap: 20px;">
                    <div class="form-group" style="flex: 1;"><label>SEO 关键词</label><input type="text" id="seo_keywords"></div>
                    <div class="form-group" style="flex: 1;"><label>SEO 描述</label><input type="text" id="seo_desc"></div>
                </div>
                <div class="form-group">
                    <label>正文内容</label>
                    <textarea id="editor"></textarea>
                </div>
                <button type="button" onclick="submitArticle()">⚡ 注入基质 (Execute)</button>
            </form>
        </div>

        <script>
            const easyMDE = new EasyMDE({ element: document.getElementById('editor'), spellChecker: false, uploadImage: true, imageUploadEndpoint: "/api/upload", imageCSRFToken: "" });

            // ✨ 显示屏显信息，绕过弹窗屏蔽
            function showStatus(msg, isError=false) {
                const box = document.getElementById('status-box');
                box.style.display = 'block';
                box.style.backgroundColor = isError ? 'rgba(255,107,129,0.2)' : 'rgba(39,201,63,0.2)';
                box.style.color = isError ? '#ff6b81' : '#27c93f';
                box.style.border = `1px solid ${isError ? '#ff6b81' : '#27c93f'}`;
                box.innerText = msg;
                setTimeout(() => box.style.display = 'none', 4000);
            }

            async function loadArticles() {
                try {
                    // 加入时间戳强制穿透 GET 缓存
                    const res = await fetch('/api/articles?t=' + new Date().getTime());
                    const articles = await res.json();
                    const html = articles.map(a => `
                        <div class="article-item">
                            <h4>${a.title}</h4>
                            <p>[${a.category.toUpperCase()}] ${a.date}</p>
                            <button class="btn-edit" onclick="editArticle('${a.slug}')">编辑</button>
                            <button class="btn-del" onclick="deleteArticle('${a.slug}')">清除</button>
                        </div>
                    `).join('');
                    document.getElementById('article-list').innerHTML = html;
                } catch (e) {
                    showStatus("历史脉络加载失败！", true);
                }
            }

            async function editArticle(slug) {
                const res = await fetch(`/api/article/${slug}?t=` + new Date().getTime());
                const data = await res.json();
                document.getElementById('edit_slug').value = data.slug;
                document.getElementById('title').value = data.title;
                document.getElementById('category').value = data.category;
                document.getElementById('seo_keywords').value = data.seo_keywords;
                document.getElementById('seo_desc').value = data.seo_desc;
                easyMDE.value(data.content_md);
                document.getElementById('mode-title').innerText = "📡 S2 Matrix CMS v1.4 - 编辑广播覆盖";
                window.scrollTo(0, 0);
            }

            function clearForm() {
                document.getElementById('edit_slug').value = '';
                document.getElementById('publish-form').reset();
                easyMDE.value('');
                document.getElementById('mode-title').innerText = "📡 S2 Matrix CMS v1.4 - 新建广播";
            }

            async function deleteArticle(slug) {
                if(!confirm('确定抹除此数据吗？')) return;
                try {
                    // 👉 强制升级为 POST 请求，绝不缓存
                    const res = await fetch(`/api/delete/${slug}`, { method: 'POST' });
                    if (!res.ok) throw new Error("HTTP " + res.status);
                    const result = await res.json();
                    showStatus(result.message);
                    loadArticles();
                    clearForm();
                } catch (e) {
                    showStatus('网络请求崩溃，请看终端红字报错！', true);
                    console.error(e);
                }
            }

            async function submitArticle() {
                const formData = new FormData();
                formData.append('title', document.getElementById('title').value);
                formData.append('category', document.getElementById('category').value);
                formData.append('seo_keywords', document.getElementById('seo_keywords').value);
                formData.append('seo_desc', document.getElementById('seo_desc').value);
                formData.append('content_md', easyMDE.value());
                formData.append('edit_slug', document.getElementById('edit_slug').value);

                if(!document.getElementById('title').value || !easyMDE.value()) { 
                    showStatus('核心参数不能为空！', true); 
                    return; 
                }

                try {
                    const response = await fetch('/api/publish', { method: 'POST', body: formData });
                    const result = await response.json();
                    showStatus(result.message);
                    loadArticles();
                    if(result.status === 'success' && !document.getElementById('edit_slug').value) clearForm();
                } catch (e) {
                    showStatus('保存失败，请检查终端！', true);
                }
            }

            loadArticles();
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("cms_server:app", host="127.0.0.1", port=8000, reload=False)