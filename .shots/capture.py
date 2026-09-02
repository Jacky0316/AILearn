# AILearn 视觉验收截图脚本：地图页 / 课程页 / 深色模式 / 交互后状态
import sys
from playwright.sync_api import sync_playwright

BASE = 'http://localhost:5175'
OUT = r'D:\Code\AILearn\.shots'

import os
os.makedirs(OUT, exist_ok=True)

shots = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # 1) 首页（知识地图）· 浅色 · 桌面
    ctx = browser.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=2)
    page = ctx.new_page()
    errors = []
    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
    page.goto(BASE + '/#/', wait_until='networkidle')
    page.wait_for_timeout(600)
    page.screenshot(path=f'{OUT}/01-home-light.png')
    shots.append('01-home-light.png')

    # 2) 首页滚动到 STAGE 区域
    page.locator('#stage-1').scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    page.screenshot(path=f'{OUT}/02-home-stage1.png')
    shots.append('02-home-stage1.png')

    # 3) 目录弹层
    page.click('text=查看课表')
    page.wait_for_timeout(400)
    page.screenshot(path=f'{OUT}/03-toc-modal.png')
    shots.append('03-toc-modal.png')
    page.keyboard.press('Escape')
    page.wait_for_timeout(300)

    # 4) 课程页 1.1.1
    page.goto(BASE + '/#/lesson/1.1.1', wait_until='networkidle')
    page.wait_for_timeout(600)
    page.screenshot(path=f'{OUT}/04-lesson-top.png')
    shots.append('04-lesson-top.png')

    # 4b) 课程页：原理深挖 + 视频区
    page.locator('#sec-deepdive').scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    page.screenshot(path=f'{OUT}/09-lesson-deepdive.png')
    shots.append('09-lesson-deepdive.png')

    # 4c) 课程页：源头论文卡（展开一个 details）
    page.locator('#sec-papers').scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    try:
        page.locator('#sec-papers details summary').first.click(timeout=2000)
        page.wait_for_timeout(300)
    except Exception:
        pass
    page.screenshot(path=f'{OUT}/10-lesson-papers.png')
    shots.append('10-lesson-papers.png')

    # 5) 课程页滚动到来源区 + Pager
    page.locator('.pager').scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    page.screenshot(path=f'{OUT}/05-lesson-bottom.png')
    shots.append('05-lesson-bottom.png')

    # 6) 标记完成 → 进度变化 + 完成态
    page.click('.complete-btn')
    page.wait_for_timeout(400)
    page.screenshot(path=f'{OUT}/06-lesson-done.png')
    shots.append('06-lesson-done.png')

    # 7) 深色模式：滚动到原理深挖 + 源头论文区块
    page.click('.theme-fab')
    page.wait_for_timeout(500)
    page.locator('#sec-deepdive').scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    page.screenshot(path=f'{OUT}/07-lesson-dark.png')
    shots.append('07-lesson-dark.png')
    page.locator('#sec-papers').scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    page.screenshot(path=f'{OUT}/11-lesson-dark-papers.png')
    shots.append('11-lesson-dark-papers.png')
    ctx.close()

    # 8) 移动端宽度（抽屉收起 + 浮动目录按钮）
    ctx2 = browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2)
    page2 = ctx2.new_page()
    page2.goto(BASE + '/#/', wait_until='networkidle')
    page2.wait_for_timeout(500)
    page2.screenshot(path=f'{OUT}/08-mobile-home.png')
    shots.append('08-mobile-home.png')
    ctx2.close()

    browser.close()
    print('CONSOLE_ERRORS:', errors if errors else 'none')
    print('DONE:', ','.join(shots))
