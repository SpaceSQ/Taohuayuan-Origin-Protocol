import sqlite3
import os

# 确保指向你当前的数据库文件
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'taohuayuan_news.db')

def upgrade_database():
    print(f"🔧 开始对 {DB_FILE} 进行无损升级...")
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # 尝试增加 seo_keywords 字段
    try:
        cursor.execute("ALTER TABLE articles ADD COLUMN seo_keywords TEXT DEFAULT ''")
        print("✅ 成功注入字段: seo_keywords")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("ℹ️ 字段 seo_keywords 已存在，跳过。")
        else:
            print(f"❌ 发生异常: {e}")

    # 尝试增加 seo_desc 字段
    try:
        cursor.execute("ALTER TABLE articles ADD COLUMN seo_desc TEXT DEFAULT ''")
        print("✅ 成功注入字段: seo_desc")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("ℹ️ 字段 seo_desc 已存在，跳过。")
        else:
            print(f"❌ 发生异常: {e}")

    conn.commit()
    conn.close()
    print("🎉 数据库表结构升级完毕！你的所有历史数据毫发无损。")

if __name__ == "__main__":
    if not os.path.exists(DB_FILE):
        print("⚠️ 找不到数据库文件，请确保此脚本与 taohuayuan_news.db 在同一目录下！")
    else:
        upgrade_database()