import os
import sqlite3
import markdown
import json
import hashlib
from datetime import datetime
from fastapi import FastAPI, File, UploadFile, Form, Request, HTTPException, Response
from fastapi.responses import HTMLResponse, JSONResponse
from jinja2 import Environment, FileSystemLoader

app = FastAPI(title="Taohuayuan CMS v3.0")

# ==========================================
# ⚙️ 核心路径配置
# ==========================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
NEXT_PUBLIC_DIR = os.path.abspath(os.path.join(BASE_DIR, '..', 'public'))
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')
DB_FILE = os.path.join(BASE_DIR, 'taohuayuan_news.db')

CATEGORIES = ['news', 'release', 'whitepaper', 'resource']

for cat in CATEGORIES: os.makedirs(os.path.join(NEXT_PUBLIC_DIR, cat), exist_ok=True)
os.makedirs(os.path.join(NEXT_PUBLIC_DIR, 'api'), exist_ok=True)

def hash_password(password: str) -> str:
    return hashlib.sha256((password + "thy_salt_2026").encode('utf-8')).hexdigest()

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

# ==========================================
# 🗄️ 数据库初始化
# ==========================================
with get_db() as db:
    db.execute('''CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, slug TEXT UNIQUE, 
        category TEXT, content_md TEXT, content_html TEXT, 
        keywords TEXT, seo_desc TEXT, views INTEGER DEFAULT 0, published_at DATETIME)''')
    db.execute('''CREATE TABLE IF NOT EXISTS admin_users (
        email TEXT PRIMARY KEY, password_hash TEXT, must_change_pwd INTEGER DEFAULT 1)''')
    # 预置管理员
    admin_email = "david.xiang@robot0.com"
    db.execute("INSERT OR IGNORE INTO admin_users (email, password_hash, must_change_pwd) VALUES (?, ?, 1)", 
               (admin_email, hash_password("12345678")))
    db.commit()

def get_current_user(request: Request):
    user_email = request.cookies.get("cms_session")
    if not user_email: return None
    with get_db() as db:
        user = db.execute("SELECT * FROM admin_users WHERE email=?", (user_email,)).fetchone()
        return dict(user) if user else None

# ==========================================
# 📡 业务 API 接口 (包含编辑回填 API)
# ==========================================
@app.post("/api/login")
async def login(response: Response, email: str = Form(...), password: str = Form(...)):
    with get_db() as db:
        user = db.execute("SELECT * FROM admin_users WHERE email=?", (email,)).fetchone()
        if user and user["password_hash"] == hash_password(password):
            response.set_cookie(key="cms_session", value=email, httponly=True)
            return {"status": "success", "must_change_pwd": user["must_change_pwd"]}
    return JSONResponse(status_code=401, content={"error": "身份认证失败"})

@app.post("/api/change_password")
async def change_password(request: Request, new_password: str = Form(...)):
    user = get_current_user(request)
    if not user: raise HTTPException(status_code=401)
    with get_db() as db:
        db.execute("UPDATE admin_users SET password_hash=?, must_change_pwd=0 WHERE email=?", 
                   (hash_password(new_password), user['email']))
        db.commit()
    return {"status": "success"}

# 拉取单篇文章供编辑使用
@app.get("/api/article/{id}")
async def get_single_article(request: Request, id: int):
    user = get_current_user(request)
    if not user: raise HTTPException(status_code=401)
    with get_db() as db:
        row = db.execute("SELECT * FROM articles WHERE id=?", (id,)).fetchone()
        if not row: raise HTTPException(status_code=404)
        return dict(row)

@app.post("/api/publish")
async def publish(request: Request, id: int = Form(0), title: str=Form(...), category: str=Form(...), content_md: str=Form(...), keywords: str=Form(""), desc: str=Form("")):
    user = get_current_user(request)
    if not user or user['must_change_pwd']: raise HTTPException(status_code=401)

    kw_list = [k.strip() for k in keywords.replace('，', ',').split(',') if k.strip()]
    clean_keywords = ",".join(kw_list[:5])
    html_body = markdown.markdown(content_md, extensions=['extra', 'tables', 'fenced_code', 'nl2br'])
    pub_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    with get_db() as db:
        if id == 0: # 新增
            slug = f"thy-{datetime.now().strftime('%Y%m%d')}-{int(datetime.now().timestamp())}"
            db.execute('INSERT INTO articles (title, slug, category, content_md, content_html, keywords, seo_desc, published_at, views) VALUES (?,?,?,?,?,?,?,?,0)',
                       (title, slug, category, content_md, html_body, clean_keywords, desc, pub_at))
        else: # 更新
            row = db.execute('SELECT slug FROM articles WHERE id=?', (id,)).fetchone()
            slug = row['slug']
            db.execute('UPDATE articles SET title=?, category=?, content_md=?, content_html=?, keywords=?, seo_desc=? WHERE id=?',
                       (title, category, content_md, html_body, clean_keywords, desc, id))
        db.commit()

    # 渲染华丽的静态页面
    env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
    try:
        template = env.get_template('article_template.html')
        final_html = template.render(title=title, category=category, slug=slug, content_html=html_body, keywords=clean_keywords, seo_desc=desc, published_at=pub_at)
    except:
        final_html = "<div><h1>" + title + "</h1>" + html_body + "</div>"

    category_path = os.path.join(NEXT_PUBLIC_DIR, category)
    with open(os.path.join(category_path, f"{slug}.html"), 'w', encoding='utf-8') as f: f.write(final_html)
    with open(os.path.join(category_path, f"{slug}.md"), 'w', encoding='utf-8') as f: f.write(content_md)

    update_latest_api()
    return {"status": "success", "message": "矩阵数据已同步！"}

def update_latest_api():
    latest_data = {cat: [] for cat in CATEGORIES}
    with get_db() as db:
        for cat in CATEGORIES:
            rows = db.execute('SELECT title, slug, published_at FROM articles WHERE category=? ORDER BY published_at DESC LIMIT 5', (cat,)).fetchall()
            for r in rows: latest_data[cat].append({"title": r["title"], "slug": r["slug"], "date": r["published_at"][:10]})
    with open(os.path.join(NEXT_PUBLIC_DIR, 'api', 'latest.json'), 'w', encoding='utf-8') as f:
        json.dump(latest_data, f, ensure_ascii=False, indent=2)

@app.get("/api/articles")
async def get_articles(request: Request, keyword: str = ""):
    user = get_current_user(request)
    if not user: raise HTTPException(status_code=401)
    with get_db() as db:
        query = "SELECT id, title, category, keywords, views, published_at FROM articles "
        params = []
        if keyword:
            query += "WHERE keywords LIKE ? "
            params.append(f"%{keyword}%")
        query += "ORDER BY id DESC"
        rows = db.execute(query, params).fetchall()
        return [dict(r) for r in rows]

@app.post("/api/delete/{id}")
async def delete_article(request: Request, id: int):
    user = get_current_user(request)
    if not user: raise HTTPException(status_code=401)
    with get_db() as db:
        db.execute('DELETE FROM articles WHERE id=?', (id,))
        db.commit()
    update_latest_api()
    return {"status": "success"}

@app.get("/api/track_view/{slug}")
async def track_view(slug: str):
    with get_db() as db:
        db.execute("UPDATE articles SET views = views + 1 WHERE slug = ?", (slug,))
        db.commit()
        row = db.execute("SELECT views FROM articles WHERE slug = ?", (slug,)).fetchone()
        return {"slug": slug, "views": row['views'] if row else 0}

# ==========================================
# 🖥️ 后台管理 UI (全功能版)
# ==========================================
@app.get("/", response_class=HTMLResponse)
async def admin_ui(request: Request):
    user = get_current_user(request)
    js_logged = 'true' if user else 'false'
    js_must_change = 'true' if (user and user.get('must_change_pwd')) else 'false'
    
    html = f"""
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <title>S2 Matrix | 新闻发布中枢</title>
        <link rel="stylesheet" href="https://unpkg.com/easymde/dist/easymde.min.css">
        <script src="https://unpkg.com/easymde/dist/easymde.min.js"></script>
        <style>
            :root {{ --bg: #050508; --cyan: #00f3ff; --peach: #ff6b81; --text: #e2e8f0; --panel: #111; }}
            body {{ background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; padding: 40px; margin: 0; }}
            .container {{ max-width: 1400px; margin: 0 auto; }}
            .panel {{ background: var(--panel); padding: 30px; border: 1px solid #333; border-radius: 8px; }}
            h1, h2 {{ color: var(--cyan); letter-spacing: 2px; }}
            input, select, button, textarea {{ width: 100%; padding: 12px; margin-bottom: 15px; background: #000; border: 1px solid #333; color: #fff; border-radius: 4px; }}
            button {{ background: var(--cyan); color: #000; font-weight: bold; cursor: pointer; border: none; transition: 0.3s; }}
            button:hover {{ box-shadow: 0 0 15px var(--cyan); background: #fff; }}
            .danger-btn {{ background: transparent; border: 1px solid var(--peach); color: var(--peach); }}
            .danger-btn:hover {{ background: var(--peach); color: #000; }}
            .kw-tag {{ display: inline-block; background: rgba(0,243,255,0.1); border: 1px solid var(--cyan); color: var(--cyan); padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; margin-right: 5px; cursor: pointer; }}
            table {{ width: 100%; border-collapse: collapse; }}
            th, td {{ padding: 15px; text-align: left; border-bottom: 1px solid #222; }}
            tr:hover {{ background: #161616; }}
            #login-view, #force-pwd-view, #dashboard-view {{ display: none; }}
            .flex-grid {{ display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; }}
            .edit-btn {{ background: rgba(0,243,255,0.1); color: var(--cyan); border: 1px solid var(--cyan); padding: 5px 10px; cursor: pointer; border-radius: 4px; font-size: 0.8rem; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div id="login-view" class="panel" style="max-width: 400px; margin: 100px auto;">
                <h2>SYSTEM LOGIN</h2>
                <input type="email" id="login-email" placeholder="ADMIN ID" value="david.xiang@robot0.com">
                <input type="password" id="login-pwd" placeholder="PASSWORD">
                <button onclick="doLogin()">AUTHENTICATE</button>
            </div>

            <div id="force-pwd-view" class="panel" style="max-width: 400px; margin: 100px auto; border-color: var(--peach);">
                <h2 style="color: var(--peach);">SECURITY ALERT</h2>
                <input type="password" id="new-pwd" placeholder="新密码 (至少8位)">
                <button onclick="doChangePwd()" style="background: var(--peach);">OVERRIDE LOCK</button>
            </div>

            <div id="dashboard-view">
                <h1>📡 桃花源内容中枢 (Matrix CMS)</h1>
                <div class="flex-grid">
                    <div class="panel">
                        <h2>DATA STREAM</h2>
                        <table id="article-table">
                            <thead><tr><th>Title / Category</th><th>Views</th><th>Action</th></tr></thead>
                            <tbody id="article-list"></tbody>
                        </table>
                    </div>

                    <div class="panel">
                        <h2 id="editor-title">INJECT NEW DATA</h2>
                        <input type="hidden" id="edit-id" value="0">
                        <input type="text" id="title" placeholder="标题">
                        <select id="category">
                            <option value="news">📺 桃花源新闻</option><option value="release">🚀 版本发布</option>
                            <option value="whitepaper">📜 白皮书</option><option value="resource">💾 资料站</option>
                        </select>
                        <input type="text" id="keywords" placeholder="关键词 (用逗号分隔)">
                        <input type="text" id="seo_desc" placeholder="一句话摘要 (SEO)">
                        <textarea id="editor"></textarea>
                        <button onclick="saveArticle()">⚡ EXECUTE (发布/更新)</button>
                        <button onclick="resetForm()" class="danger-btn">RESET (重置表单)</button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            const userLogged = {js_logged};
            const mustChange = {js_must_change};
            
            if (!userLogged) {{ document.getElementById('login-view').style.display = 'block'; }}
            else if (mustChange) {{ document.getElementById('force-pwd-view').style.display = 'block'; }}
            else {{ document.getElementById('dashboard-view').style.display = 'block'; loadArticles(); }}

            const easyMDE = new EasyMDE({{ element: document.getElementById('editor'), spellChecker: false }});

            async function doLogin() {{
                const fd = new FormData();
                fd.append('email', document.getElementById('login-email').value);
                fd.append('password', document.getElementById('login-pwd').value);
                const res = await fetch('/api/login', {{ method: 'POST', body: fd }});
                if(res.ok) location.reload(); else alert("认证失败");
            }}

            async function doChangePwd() {{
                const fd = new FormData();
                fd.append('new_password', document.getElementById('new-pwd').value);
                const res = await fetch('/api/change_password', {{ method: 'POST', body: fd }});
                if(res.ok) location.reload(); else alert("密码不符合要求");
            }}

            async function loadArticles(keyword = "") {{
                const res = await fetch(`/api/articles?keyword=${{encodeURIComponent(keyword)}}`);
                const data = await res.json();
                const tbody = document.getElementById('article-list');
                tbody.innerHTML = '';
                data.forEach(art => {{
                    tbody.innerHTML += `
                        <tr>
                            <td>
                                <b>${{art.title}}</b><br>
                                <span style="font-size:0.7rem; color:#666">${{art.category.toUpperCase()}} | ${{art.published_at.substring(0,10)}}</span>
                            </td>
                            <td style="color:var(--peach)">👁 ${{art.views}}</td>
                            <td>
                                <button class="edit-btn" onclick="editArticle(${{art.id}})">编辑</button>
                                <button class="edit-btn danger-btn" style="border:none" onclick="deleteArticle(${{art.id}})">删除</button>
                            </td>
                        </tr>
                    `;
                }});
            }}

            // 🚀 这里是关键：编辑回填逻辑
            async function editArticle(id) {{
                const res = await fetch(`/api/article/${{id}}`);
                const art = await res.json();
                document.getElementById('edit-id').value = art.id;
                document.getElementById('title').value = art.title;
                document.getElementById('category').value = art.category;
                document.getElementById('keywords').value = art.keywords || '';
                document.getElementById('seo_desc').value = art.seo_desc || '';
                easyMDE.value(art.content_md);
                document.getElementById('editor-title').innerText = "⚙️ OVERRIDING DATA (正在修改文章)";
                document.getElementById('editor-title').style.color = 'var(--peach)';
                window.scrollTo({{top: 0, behavior: 'smooth'}});
            }}

            async function saveArticle() {{
                const fd = new FormData();
                fd.append('id', document.getElementById('edit-id').value);
                fd.append('title', document.getElementById('title').value);
                fd.append('category', document.getElementById('category').value);
                fd.append('keywords', document.getElementById('keywords').value);
                fd.append('desc', document.getElementById('seo_desc').value);
                fd.append('content_md', easyMDE.value());
                
                try {{
                    const res = await fetch('/api/publish', {{ method: 'POST', body: fd }});
                    if(!res.ok) throw new Error("服务器拒绝写入");
                    const result = await res.json();
                    alert(result.message);
                    resetForm();
                    loadArticles();
                }} catch(err) {{ alert(err.message); }}
            }}

            async function deleteArticle(id) {{
                if(!confirm("⚠️ 确定要抹除该数据节点吗？")) return;
                await fetch(`/api/delete/${{id}}`, {{ method: 'POST' }});
                loadArticles();
            }}

            function resetForm() {{
                document.getElementById('edit-id').value = '0';
                document.getElementById('title').value = '';
                document.getElementById('keywords').value = '';
                document.getElementById('seo_desc').value = '';
                easyMDE.value('');
                document.getElementById('editor-title').innerText = "INJECT NEW DATA";
                document.getElementById('editor-title').style.color = 'var(--cyan)';
            }}
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("cms_server:app", host="127.0.0.1", port=8000, reload=True)